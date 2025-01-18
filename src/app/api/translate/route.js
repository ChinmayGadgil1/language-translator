// pages/api/runFlow.js
import { NextResponse } from "next/server";

export async function POST(req) {
try {
    const {
      inputValue,
      inputType = 'chat',
      outputType = 'chat',
      stream = false,
    } =await  req.json();
  
    const flowIdOrName = process.env.NEXT_PUBLIC_FLOWIDORNAME;
    const langflowId=process.env.NEXT_PUBLIC_LANGFLOW_ID;
    const applicationToken = process.env.NEXT_PUBLIC_LANGFLOW_APPLICATION_TOKEN;
    console.log(flowIdOrName,"     ",langflowId,"     ",applicationToken);
  
    if (!applicationToken) {
      
      return NextResponse.json({
        success: false,
        error: 'Server misconfiguration. Missing application token.'
      });
    }
  
    class LangflowClient {
        constructor(baseURL, applicationToken) {
          this.baseURL = baseURL;
          this.applicationToken = applicationToken;
        }
  
        async post(endpoint, body, headers = { 'Content-Type': 'application/json' }) {
          headers['Authorization'] = `Bearer ${this.applicationToken}`;
          const url = `${this.baseURL}${endpoint}`;
          const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
          });
  
          const responseMessage = await response.json();
          if (!response.ok) {
            throw new Error(
              `${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`
            );
          }
          return responseMessage;
        }
  
        async initiateSession(flowId, langflowId, inputValue, tweaks, stream) {
          const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
          return this.post(endpoint, {
            input_value: inputValue,
            input_type: 'chat',
            output_type: 'chat',
            tweaks,
          });
        }
      }
  
      const client = new LangflowClient(baseURL, applicationToken);
  
      // Run the flow and return the response
      const response = await client.initiateSession(flowId, langflowId, inputValue, tweaks, stream);
      return NextResponse.json(response);
    } catch (error) {
      console.error("Error running flow:", error.message);
      return NextResponse.json({ error: "Error initiating session", details: error.message }, { status: 500 });
    }
  }
  