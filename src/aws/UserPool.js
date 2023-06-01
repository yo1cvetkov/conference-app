import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_YlEUkRHIB",
  ClientId: "1kn5a6s33144dt61onh0jdpd25",
};

export default new CognitoUserPool(poolData);
