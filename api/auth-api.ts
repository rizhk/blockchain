import type { User } from '../types/user';
import { PicanteApi } from './end-point';

type LoginRequest = {
  email: string;
  password: string;
};
class AuthApi {
  async login({ email, password }: { email: string; password: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Find the user
        let l: LoginRequest = {
          email: email,
          password: password,
        };

        fetch(PicanteApi.Auth, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(l),
        })
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data);
              if (!data.error) {
                resolve(data.token);
              } else {
                reject(new Error(data.message));
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async register({
    email,
    name,
    password,
  }: // phone,
  {
    email: string;
    name: string;
    password: string;
    // phone: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let body = {
          email,
          full_name: name,
          password,
          // phone,
        };

        fetch(PicanteApi.Register, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then(
            (data) => {
              if (!data.error) {
                fetch(PicanteApi.Auth, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email,
                    password,
                  }),
                })
                  .then((response) => response.json())
                  .then(
                    (data) => {
                      console.log(data);
                      if (!data.error) {
                        resolve(data.token);
                      } else {
                        reject(new Error(data.message));
                      }
                    },
                    (error) => {
                      reject(new Error(error.message));
                    },
                  );
              } else {
                if (data.message != '') {
                  reject(new Error(data.message));
                } else {
                  reject(new Error('error'));
                }
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(accessToken: string): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        fetch(PicanteApi.AuthMe, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authentication: accessToken,
          },
        })
          .then((response) => response.json())
          .then(
            (data) => {
              if (data.me) {
                resolve(data.me);
              } else {
                reject(new Error('Invalid authorization token'));
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  skipTutorial(isSkip: boolean): Promise<String> {
    const accessToken = localStorage.getItem('accessToken') || '';
    return new Promise((resolve, reject) => {
      try {
        fetch(PicanteApi.TutorialSkip, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authentication: accessToken,
          },
          body: JSON.stringify({ skip_tutorial: isSkip }),
        })
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data);
              if (!data.error) {
                resolve(data.msg);
              } else {
                reject(new Error('Invalid authorization token'));
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  verify(code: string): Promise<String> {
    const accessToken = localStorage.getItem('accessToken') || '';
    return new Promise((resolve, reject) => {
      try {
        fetch(PicanteApi.VerifyEmail, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authentication: accessToken,
          },
          body: JSON.stringify({ ver_code: code }),
        })
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data);
              if (!data.error) {
                resolve(data.msg);
              } else {
                reject(new Error('Invalid authorization token'));
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  resend(): Promise<String> {
    const accessToken = localStorage.getItem('accessToken') || '';
    return new Promise((resolve, reject) => {
      try {
        fetch(PicanteApi.ResendVerifyCode, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authentication: accessToken,
          },
        })
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data);
              if (!data.error) {
                resolve(data.msg);
              } else {
                reject(new Error('Invalid authorization token'));
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  forgotPassword(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Find the user
        let l = {
          email: email,
        };

        fetch(PicanteApi.RecoverPassword, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(l),
        })
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data);
              if (!data.error) {
                resolve(data.message);
              } else {
                reject(new Error('error'));
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  resetPassword(recovery_key: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Find the user
        let l = {
          recovery_key,
          password,
        };

        fetch(PicanteApi.ResetPassword, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(l),
        })
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data);
              if (!data.error) {
                resolve(data.message);
              } else {
                reject(new Error('error'));
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateUser(data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
    full_name: string;
  }): Promise<string> {
    const accessToken = localStorage.getItem('accessToken') || '';
    return new Promise((resolve, reject) => {
      try {
        fetch(PicanteApi.UpdateUser, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authentication: accessToken },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then(
            (data) => {
              console.log(data);
              if (!data.error) {
                resolve(data.message);
              } else {
                reject(new Error('error'));
              }
            },
            (error) => {
              reject(new Error(error.message));
            },
          );
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
