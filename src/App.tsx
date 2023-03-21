import { gql, useLazyQuery } from "@apollo/client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import "./App.css";

const GOOGLE_LOGIN = gql`
  query LoginGoogle {
    loginGoogle {
      user {
        id
      }
      token
    }
  }
`;

const GOOGLE_FACEBOOK = gql`
  query LoginFacebook {
    loginFacebook 
  }
`;

function App() {
  // const [makeQuery, { loading, data, error }] = useLazyQuery(GOOGLE_LOGIN);
  const [makeQuery, { loading, data, error }] = useLazyQuery(GOOGLE_FACEBOOK);

  return (
    <div>
      <GoogleOAuthProvider clientId="722587894619-f70cat4qn00ujtpmhe00197ctusu3pmg.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            makeQuery({
              context: {
                headers: {
                  authorization: `Bearer ${credentialResponse.credential}`,
                },
              },
            });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
      <br />
      <FacebookLogin
        appId="1371901850020347"
        onSuccess={(response) => {
          console.log(response)
          makeQuery({
            context: {
              headers: {
                authorization: `Bearer ${response.accessToken}`,
              },
            },
          });
        }}
      />
    </div>
  );
}

export default App;
