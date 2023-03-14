const useLocalStorage = () => {
  const setValueInLocalStorage = (objName, objValue) => {
    localStorage.setItem(objName, JSON.stringify(objValue));
  };
  const getValueFromLocalStorage = (objName) => {
    return JSON.parse(localStorage.getItem(objName));
  };
  const removeValueFromLocalStorage = (objName) => {
    localStorage.removeItem(objName);
  };

  return {
    setValueInLocalStorage,
    getValueFromLocalStorage,
    removeValueFromLocalStorage,
  };
};
export default useLocalStorage;
