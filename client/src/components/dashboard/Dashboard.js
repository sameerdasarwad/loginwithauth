import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
//import * as React from 'react';

import ImageUploading from 'react-images-uploading';

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

class Dashboard extends Component {
  onChange = (imageList) => {
    // data for submit
    console.log(imageList);
  };
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(' ')[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged in{' '}
                <span style={{ fontFamily: 'monospace' }}>MY</span> app 👏
              </p>
            </h4>
            <ImageUploading
              onChange={this.onChange}
              maxNumber={maxNumber}
              multiple
              maxFileSize={maxMbFileSize}
              acceptType={['jpg', 'gif', 'png']}
            >
              {({ imageList, onImageUpload, onImageRemoveAll }) => (
                // write your building UI
                <div>
                  <button onClick={onImageUpload}>Upload images</button>
                  <button onClick={onImageRemoveAll}>Remove all images</button>

                  {imageList.map((image) => (
                    <div key={image.key}>
                      // eslint-disable-next-line
                      <img src={image.dataURL} />
                      <button onClick={image.onUpdate}>Update</button>
                      <button onClick={image.onRemove}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
            <button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
