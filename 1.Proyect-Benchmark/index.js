const $globalCode = document.querySelector('#global');
const $sendButton = document.querySelector('#send-button');

async function runTest({ code, data }) {
  const duration = 2000; // 2 seconds
  let result;

  try {
    result = await eval(`(async () => {
      let PERF_ops = 0;
      let PERF_start = Date.now();
      let PERF_end = Date.now() + ${duration};
      ${data};
  
      while (Date.now() < PERF_end) {
        ${code};
        PERF_ops++;
      } 
  
      return PERF_ops;
    })()`);
  } catch (error) {
    console.log(error);
    result = 0;
  }

  return result;
}

async function runTestCases() {
  const $testCases = document.querySelectorAll('.test-case');

  const globalCode = $globalCode.value

  $testCases.forEach(async ($testCase) => {
    const $code = $testCase.querySelector('.code');
    const $ops = $testCase.querySelector('.ops');

    const codeValue = $code.value;
    $ops.textContent = 'Loading...';

    const result = await runTest({ code: codeValue, data: globalCode });
    console.log(result);
  });
}

runTestCases();

$sendButton.addEventListener('click', () => {
  runTestCases();
});