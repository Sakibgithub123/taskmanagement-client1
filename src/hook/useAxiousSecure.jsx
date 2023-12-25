import axios from "axios";

 const axiousSecure = axios.create({
    baseURL: 'http://localhost:5000',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

const useAxiousSecure = () => {
    return axiousSecure
};

export default useAxiousSecure;