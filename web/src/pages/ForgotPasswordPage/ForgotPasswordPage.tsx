import { useEffect, useRef } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const malavnagar90GmailComRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    malavnagar90GmailComRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { malavnagar90GmailCom: string }) => {
    const response = await forgotPassword(data.malavnagar90GmailCom)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your tanu@12345 was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <Metadata title="Forgot TaNu@12345" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot TaNu@12345
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="malavnagar90GmailCom"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      malavnagar90@gmail.com
                    </Label>
                    <TextField
                      name="malavnagar90GmailCom"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={malavnagar90GmailComRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'malavnagar90@gmail.com is required',
                        },
                      }}
                    />

                    <FieldError
                      name="malavnagar90GmailCom"
                      className="rw-field-error"
                    />
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
