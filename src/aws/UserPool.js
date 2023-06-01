import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_JtOluUoxG",
  ClientId: "mivkj3eqqi0kshpdhrim7usc7",
};

export default new CognitoUserPool(poolData);
