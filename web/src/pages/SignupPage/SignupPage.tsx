import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on malavnagar90@gmail.com box on page load
  const malavnagar90GmailComRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    malavnagar90GmailComRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.malavnagar90GmailCom,
      password: data.taNu_12345,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <Metadata title="Signup" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
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

                  <Label
                    name="taNu_12345"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    TaNu@12345
                  </Label>
                  <PasswordField
                    name="taNu_12345"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'TaNu@12345 is required',
                      },
                    }}
                  />
                  <FieldError name="taNu_12345" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
