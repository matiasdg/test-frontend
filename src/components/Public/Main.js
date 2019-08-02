import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {
  Image,
  Header,
  Container,
  Button,
  Grid
} from 'semantic-ui-react'
import {
  Form
} from 'formsy-semantic-ui-react'

@withRouter
@inject('store')
@observer
export default class Main extends Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
    this.state = {
      retrieving: false
    }
    this.formSubmission = this.formSubmission.bind(this)
  }
  async formSubmission (data) {
    this.store.appState.authenticate(data.email, data.password)
  }
  render () {
    const { retrieving } = this.state
    return <Container text className='full-height'>
      <Grid verticalAlign='middle' stackable columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Image src={require('@/images/img_login_candidate')} style={{height: '210px'}} centered />
          </Grid.Column>
          <Grid.Column>
            <Header as='h1'>
              <strong>
                Candidate Login.
              </strong>
              <Header.Subheader>
                Please login here to access your <strong>candidate account</strong>.
              </Header.Subheader>
            </Header>
            <Form
              name='form'
              size='large'
              onValidSubmit={this.formSubmission}
            >
              <Form.Input
                type='email'
                name='email'
                label='Email'
                placeholder='inbox@mail.com'
                size='large'
                required
                validations='isEmail'
                validationErrors={{ isEmail: 'Email is not valid' }}
                instantValidation
              />
              <Form.Input
                type='password'
                name='password'
                label='Password'
                placeholder='•••••••'
                size='large'
                required
                instantValidation
              />
              <div className='link-container'>
                <Link to='/forgot-your-password'>Forgot your password?</Link>
              </div>
              <Button
                positive
                fluid
                size='large'
                disabled={retrieving}
                loading={retrieving}
              >
                Login
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  }
}
