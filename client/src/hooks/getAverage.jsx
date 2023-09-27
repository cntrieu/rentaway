export const GetAverage = (nums) => {

    if (nums.length === 0) {
        return 0; 
      }
    
      const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
      const average = sum / nums.length;
    
      return average;
};
