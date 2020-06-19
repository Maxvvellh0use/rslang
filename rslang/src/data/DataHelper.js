export default class DataHelper {
  static makeRequest = async (url, data = {}, errorMessage) => {
    // console.log(url);
    const rawResponse = await fetch(url, data);
    // console.log(rawResponse);
    if (!rawResponse.ok) {
      switch (rawResponse.status) {
        case 417:
          throw new Error(
            `In ${errorMessage}. Error code: ${rawResponse.status}. Message: Such user word already exists`
          );        
        default:
          throw new Error(
            `In ${errorMessage}. Error code: ${rawResponse.status}. Message: ${rawResponse.statusText}`
          );
      }
    }    
    // console.log(rawResponse);
    try {
      if (rawResponse.status === 204) return {};  // DELETE UserWord contains no content
      return rawResponse.json();
    } catch (error) {
      throw new Error(error);
    }    
  };
}
