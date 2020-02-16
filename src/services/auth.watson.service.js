const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

const assistant = new AssistantV2({
  version: "2019-02-28",
  authenticator: new IamAuthenticator({
    apikey: "XWhf71Rm9hYMsm-grx9yy6chbFLvcLFB7U14MTbDz_gK"
  }),
  url: "https://api.us-south.assistant.watson.cloud.ibm.com"
});

exports.createSession = async function(req) {
  try {
    return await assistant
      .createSession({
        assistantId: "232ec415-74d4-4a23-899e-2705123c68e6"
      })
      .then(res => {
        return res.result.session_id;
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {}
};

exports.deleteSession = async function(sessionId) {
    try {
      return await assistant
        .deleteSession({
          assistantId: "232ec415-74d4-4a23-899e-2705123c68e6",
          sessionId: sessionId,
        })
        .then(res => {
          
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {}
};

exports.sendUserInput = async function(sessionId, message, userId) {
    try {
      return await assistant.message({
            assistantId: '232ec415-74d4-4a23-899e-2705123c68e6',
            sessionId: sessionId,
            input: {
              'message_type': 'text',
              'text': message,
              'options': {
                'return_context': true
              }
            },
            context: {
              'global': {
                'system': {
                  'user_id': userId
                }
              }   
            }
            })
            .then(res => {
              return res.result.output;
            })
            .catch(err => {
              console.log(err);
            });
    } catch (err) {}
};

exports.getFirst = async (sessionId, userId) => {
  return await assistant.message({
    assistantId: '232ec415-74d4-4a23-899e-2705123c68e6',
    sessionId: sessionId,
    input: {
      'message_type': 'text',
      'text': '',
      'options': {
        'return_context': true
      }
    },
    context: {
      'global': {
        'system': {
          'user_id': userId
        }
      }   
    }
    })
    .then(res => {
      return res.result.output.generic[0];
    })
    .catch(err => {
      console.log(err);
    });
}