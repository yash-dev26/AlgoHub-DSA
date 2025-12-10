class TestService {
  constructor(){
    //db connection or any setup can be done here
  }
  async pingCheck(){
    return 'pong';
  }
}

export default TestService;