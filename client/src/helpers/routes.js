import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { authContext } from "../context/Auth";

export const REDIRECT_REASONS_UNAUTHENTICATED = "unAuthenticated";

export default function ProtectedRoute({
  component: Component,
  role: role,
  ...rest
}) {
  const { auth } = useContext(authContext);

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (
            auth.authenticated &&
            (role === undefined || role === auth.user.role)
          ) {
            return <Component {...props} />;
          } else {
            const from = "/";
            return (
              <Redirect
                to={{
                  pathname: from,
                  state: {
                    from: props.location,
                    reason: REDIRECT_REASONS_UNAUTHENTICATED,
                  },
                }}
              />
            );
          }
        }}
      />
    </>
  );
}
