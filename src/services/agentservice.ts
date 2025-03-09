import { listOfAgents, RootAgent } from "../utils/agents";
import { sendMessageToModel } from "../provider/openRouter";

export class AgentService {
  async getMessage(args: { message: string }): Promise<any> {
    const { message } = args;
    const agent = RootAgent;

    if (!agent) {
      throw new Error("Agent not found");
    }
    let messageToModel = `${agent.prompt} ${message} ${JSON.stringify(
      listOfAgents.map((agent) => {
        return {
          name: agent.name,
          id: agent.id,
          description: agent.description,
        };
      })
    )}`;
    const result = await sendMessageToModel(messageToModel);

    if (!result) {
      throw new Error("Error getting response from model");
    }

    if (result.content === null) {
      throw new Error("Result content is null");
    }
    const validResult = JSON.parse(result.content);

    const chosenAgent = listOfAgents.find(
      (agent) => agent.id === validResult.id
    );

    if (!chosenAgent) {
      throw new Error("Chosen agent not found");
    }

    messageToModel = `${chosenAgent.prompt} ${message}`;

    const response = await sendMessageToModel(messageToModel);

    if (!response) {
      throw new Error("Error getting response from model");
    }

    if (response.content === null) {
      throw new Error("Response content is null");
    }
    console.log("Response from model:");

    return response.content;
  }
}
