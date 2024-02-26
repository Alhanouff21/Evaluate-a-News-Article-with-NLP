import { updateUI } from "./js/updatedata";

//  a Mock data for testing
const mockData = {
    subjectivity: 'OBJECTIVE',
    agreement: 'AGREEMENT',
    irony: 'NONIRONIC',
    confidence: 100,
  };
  

  describe('updateUI', () => {
  
    it('should update the UI with the provided data', () => {
     
      const container = document.createElement('div');
      container.id = 'results';
      updateUI(mockData);
  
   
      expect(container.innerText).toMatch(`Subjectivity: ${mockData.subjectivity}`);
      expect(container.innerText).toMatch(`Agreement: ${mockData.agreement}`);
      expect(container.innerText).toMatch(`Irony: ${mockData.irony}`);
      expect(container.innerText).toMatch(`Confidence: ${mockData.confidence}`);
    });
  });