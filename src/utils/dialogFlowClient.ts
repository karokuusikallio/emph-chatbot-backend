import { SessionsClient } from "@google-cloud/dialogflow-cx";
import { v4 as uuidv4 } from "uuid";

async function runDialogFlowQuery(query: string) {
  const projectId = process.env.GOOGLE_PROJECT_ID as string;
  const location = "global";
  const agentId = process.env.DIALOGFLOW_AGENT_ID as string;
  const languageCode = "en";

  const keyFile = JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY as string);

  const config = {
    credentials: {
      private_key: keyFile.private_key,
      client_email: keyFile.client_email,
    },
  };

  const client = new SessionsClient(config);

  const sessionId = uuidv4();
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };

  try {
    const response = await client.detectIntent(request);
    return response;
  } catch (error) {
    return error;
  }
}

export default runDialogFlowQuery;
