import language from "@google-cloud/language";

interface languageServiceProps {
  text: string;
  method: "ANNOTATE_TEXT";
}

const languageServiceClient = async (props: languageServiceProps) => {
  const client = new language.LanguageServiceClient();

  const document = {
    content: props.text,
    type: "PLAIN_TEXT" as "PLAIN_TEXT",
  };

  const request = {
    document,
    features: {
      extractSyntax: true,
      extractEntities: true,
      extractDocumentSentiment: true,
      extractEntitySentiment: true,
      classifyText: false,
    },
  };

  if (props.method === "ANNOTATE_TEXT") {
    const result = await client.annotateText(request);
    return result;
  }
};

export default languageServiceClient;
