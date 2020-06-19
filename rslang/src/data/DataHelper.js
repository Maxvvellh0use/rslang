export default class DataHelper {
  static makeRequest = async (url, data = {}, errorMessage) => {    
    const rawResponse = await fetch(url, data);    
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
    try {
      if (rawResponse.status === 204) return {};  // DELETE UserWord contains no content
      return rawResponse.json();
    } catch (error) {
      throw new Error(error);
    }    
  };
}
