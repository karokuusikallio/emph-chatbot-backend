import { SessionsClient } from "@google-cloud/dialogflow-cx";
import { v4 as uuidv4 } from "uuid";

async function runDialogFlowQuery(query: string) {
  const projectId = process.env.GOOGLE_PROJECT_ID as string;
  const location = "global";
  const agentId = process.env.DIALOGFLOW_AGENT_ID as string;
  const languageCode = "en";

  const client = new SessionsClient({
    keyFile:
      process.env.NODE_ENV === "production"
        ? process.env.DIALOGFLOW_PRIVATE_KEY
        : "empathetic-chatbot-369609-8dd74fc860c4.json",
  });

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
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
}

export default runDialogFlowQuery;
