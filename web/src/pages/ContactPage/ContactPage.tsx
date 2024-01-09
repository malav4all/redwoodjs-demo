import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

import {
  Form,
  TextField,
  Submit,
  SubmitHandler,
  TextAreaField,
} from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string
  email: string
  message: string
}
const ContactPage = () => {
  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
    },
  })
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({ variables: { input: data } })
  }
  return (
    <>
      <Metadata title="Contact" description="Contact page" />

      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <label htmlFor="name">Name</label>
        <TextField name="name" />
        <label htmlFor="name">Email</label>
        <TextField name="email" />
        <label htmlFor="name">Message</label>
        <TextAreaField name="message" />
        <Submit>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
