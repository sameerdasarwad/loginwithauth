import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import {
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';

const FILE_FIELD_NAME = 'picture';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  let dropzoneRef;
  return (
    <Panel className="text-center">
      <Container>
        <Row>
          <Dropzone
            style={{
              width: '200px',
              height: '200px',
              borderWidth: '2px',
              borderColor: 'rgb(102, 102, 102)',
              borderStyle: 'dashed',
              borderRadius: '5px',
              padding: '20px',
            }}
            name={field.name}
            onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
            ref={(node) => {
              dropzoneRef = node;
            }}
            maxSize={5242880}
            multiple={false}
            accept={'image/*'}
            className="drop-zone"
          >
            {({ isDragActive, isDragReject, acceptedFiles }) => {
              if (isDragActive) {
                return 'This file is authorized';
              }
              if (isDragReject) {
                return 'This file is not authorized';
              }
              return acceptedFiles.length
                ? `Accepted ${acceptedFiles.length}} files`
                : 'Try dropping some files.';
            }}
          </Dropzone>
          {field.meta.touched && field.meta.error && (
            <span className="error">{field.meta.error}</span>
          )}
          {files && Array.isArray(files) && (
            <ul>
              {files.map((file, i) => (
                <li key={i}>
                  <img key={i} src={file.preview} alt="preview" />
                  <p>{file.name}</p>
                </li>
              ))}
            </ul>
          )}
        </Row>
        <Row>
          <Button
            type="button"
            style={{ margin: '5px' }}
            onClick={() => {
              dropzoneRef.open();
            }}
          >
            Add An Image
          </Button>
        </Row>
      </Container>
    </Panel>
  );
};
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 200) {
    errors.name = 'Must be 200 characters or less';
  }
  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 200) {
    errors.description = 'Must be 200 characters or less';
  }

  if (!values.url) {
    errors.url = 'Required';
  } else if (values.url.length > 150) {
    errors.url = 'Must be 150 characters or less';
  }
  if (!values.about) {
    errors.about = 'Required';
  } else if (values.about.length > 500) {
    errors.about = 'Must be 500 characters or less';
  }
  if (!values.picture) {
    errors.picture = 'Required';
  }

  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <FormGroup>
    <FormLabel>{label}</FormLabel>
    <div>
      <FormControl {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </FormGroup>
);
const renderTextArea = ({ input, meta: { touched, error, warning } }) => (
  <FormGroup>
    <FormLabel>Content</FormLabel>
    <div>
      <FormControl
        componentClass="textarea"
        placeholder="write about the project"
        {...input}
        rows="10"
        cols="40"
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </FormGroup>
);

const SyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Container style={{ margin: '20px' }}>
      <Row className="text-left">
        <div>
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              type="text"
              component={renderField}
              label="Name"
            />
            <Field
              name="description"
              type="text"
              component={renderField}
              label="Description"
            />
            <Field name="url" type="text" component={renderField} label="Url" />
            <Field
              name="about"
              type="text"
              component={renderTextArea}
              label="About"
            />
            <Field name={FILE_FIELD_NAME} component={renderDropzoneInput} />

            <Container className="text-center">
              <Row>
                <Col sm={12} md={12}>
                  <Button
                    bsStyle="primary"
                    type="submit"
                    disabled={submitting}
                    style={{ margin: '5px' }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12}>
                  <Button
                    bsStyle="danger"
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                    style={{ margin: '5px' }}
                  >
                    Clear Values
                  </Button>
                </Col>
              </Row>
            </Container>
          </form>
        </div>
      </Row>
    </Container>
  );
};

export default reduxForm({
  form: 'syncValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(SyncValidationForm);
