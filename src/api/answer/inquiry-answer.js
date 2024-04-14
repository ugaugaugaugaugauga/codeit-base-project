// 답변조회
import axios from "axios";

export const inquiryAnswer = async (content) => {
  try {
    const response = await axios.get(
      "http://openmind-api.vercel.app/5-3/answer/49/",
      {
        content: content,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};