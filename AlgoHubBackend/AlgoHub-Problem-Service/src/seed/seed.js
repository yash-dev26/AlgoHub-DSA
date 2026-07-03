const mongoose = require('mongoose');
const { ATLAS_DB_URL } = require('../config/server.config');
const logger = require('../config/logger.config');
const Problem = require('../models/problems.model');

const sampleProblems = [
  {
    title: 'Find Cube of a Number',
    description:
      '# Problem: Find Cube of a Number\n\n---\n\n## Problem Description\n\nGiven an integer `N`, return the **cube** of `N`.\n\nThe cube of a number is calculated as:\n\n`N × N × N`\n\nYou are required to compute the cube for multiple test cases.\n\n---\n\n## Task\n\nFor each test case:\n\n- Read the integer `N`\n- Print the cube of `N`\n\n---\n\n## Input Format\n\n- The first line contains an integer `T` — the number of test cases\n- The next `T` lines each contain a single integer `N`\n\n---\n\n## Output Format\n\n- For each test case, print the cube of `N` on a new line\n\n---\n\n## Constraints\n\n- `1 ≤ T ≤ 100`\n- `-10^4 ≤ N ≤ 10^4`\n',
    difficulty: 'easy',
    tags: ['math', 'basics'],
    testCases: [
      { input: '2\n3\n5', output: '27\n125' },
      { input: '1\n-4', output: '-64' }
    ],
    codeStub: [
      {
        language: 'java',
        startStub:
          '//{ Driver Code Starts\nimport java.io.*;\nimport java.util.*;\n\nclass Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n\n        int t = Integer.parseInt(br.readLine().trim());\n        while (t-- > 0) {\n            int n = Integer.parseInt(br.readLine().trim());\n            Solution sln = new Solution();\n            System.out.println(sln.findCube(n));\n        }\n    }\n}\n// } Driver Code Ends\n',
        endStub: '',
        userStub:
          'class Solution {\n\n    public int findCube(int n) {\n        // Write your logic here\n    }\n\n}\n'
      },
      {
        language: 'cpp',
        startStub:
          '//{ Driver Code Starts\n#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n',
        endStub:
          '};\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        int n;\n        cin >> n;\n        Solution sln;\n        cout << sln.findCube(n) << endl;\n    }\n    return 0;\n}\n// } Driver Code Ends\n',
        userStub:
          '    int findCube(int n) {\n        // Write your logic here\n    }\n\n'
      },
      {
        language: 'python',
        startStub: '#{ Driver Code Starts\nclass Solution:\n',
        endStub:
          '\nif __name__ == "__main__":\n    t = int(input())\n    for _ in range(t):\n        n = int(input())\n        sln = Solution()\n        print(sln.findCube(n))\n#} Driver Code Ends\n',
        userStub:
          '    def findCube(self, n):\n        # Write your logic here\n        pass\n\n'
      }
    ]
  },
  {
    title: 'Check Even or Odd',
    description:
      '# Problem: Check Even or Odd\n\n---\n\n## Problem Description\n\nGiven an integer `N`, determine whether it is **even** or **odd**.\n\n---\n\n## Task\n\nFor each test case:\n\n- Read the integer `N`\n- Print `"EVEN"` if N is even, otherwise print `"ODD"`\n\n---\n\n## Input Format\n\n- The first line contains an integer `T` — the number of test cases\n- The next `T` lines each contain a single integer `N`\n\n---\n\n## Output Format\n\n- For each test case, print `EVEN` or `ODD` on a new line\n\n---\n\n## Constraints\n\n- `1 ≤ T ≤ 100`\n- `-10^4 ≤ N ≤ 10^4`\n',
    difficulty: 'easy',
    tags: ['math', 'basics'],
    testCases: [
      { input: '2\n4\n7', output: 'EVEN\nODD' },
      { input: '1\n-8', output: 'EVEN' }
    ],
    codeStub: [
      {
        language: 'java',
        startStub:
          '//{ Driver Code Starts\nimport java.io.*;\nimport java.util.*;\n\nclass Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n\n        int t = Integer.parseInt(br.readLine().trim());\n        while (t-- > 0) {\n            int n = Integer.parseInt(br.readLine().trim());\n            Solution sln = new Solution();\n            System.out.println(sln.checkEvenOdd(n));\n        }\n    }\n}\n// } Driver Code Ends\n',
        endStub: '',
        userStub:
          'class Solution {\n\n    public String checkEvenOdd(int n) {\n        // Write your logic here\n    }\n\n}\n'
      },
      {
        language: 'cpp',
        startStub:
            '//{ Driver Code Starts\n#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n',
        endStub:
            '};\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        int n;\n        cin >> n;\n        Solution sln;\n        cout << sln.checkEvenOdd(n) << endl;\n    }\n    return 0;\n}\n// } Driver Code Ends\n',
        userStub:
            '    string checkEvenOdd(int n) {\n        // Write your logic here\n    }\n\n'
        },
        {
        language: 'python',
        startStub:
            '#{ Driver Code Starts\nclass Solution:\n',
        endStub:
            '\nif __name__ == "__main__":\n    t = int(input())\n    for _ in range(t):\n        n = int(input())\n        sln = Solution()\n        print(sln.checkEvenOdd(n))\n#} Driver Code Ends\n',
        userStub:
            '    def checkEvenOdd(self, n):\n        # Write your logic here\n        pass\n\n'
        }
    ],
  },
  {
    title: 'Reverse an Array',
    description:
      '# Problem: Reverse an Array\n\n---\n\n## Problem Description\n\nGiven an array of `N` integers, print the array in **reverse order**.\n\n---\n\n## Task\n\nFor each test case:\n\n- Read `N`, then read `N` space-separated integers\n- Print the array reversed, space-separated, on a single line\n\n---\n\n## Input Format\n\n- The first line contains an integer `T` — the number of test cases\n- For each test case:\n  - A line with integer `N`\n  - A line with `N` space-separated integers\n\n---\n\n## Output Format\n\n- For each test case, print the reversed array on a new line\n\n---\n\n## Constraints\n\n- `1 ≤ T ≤ 50`\n- `1 ≤ N ≤ 1000`\n',
    difficulty: 'medium',
    tags: ['array', 'basics'],
    testCases: [
      { input: '1\n5\n1 2 3 4 5', output: '5 4 3 2 1' },
      { input: '1\n3\n7 8 9', output: '9 8 7' }
    ],
    codeStub: [
      {
        language: 'java',
        startStub:
          '//{ Driver Code Starts\nimport java.io.*;\nimport java.util.*;\n\nclass Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n\n        int t = Integer.parseInt(br.readLine().trim());\n        while (t-- > 0) {\n            int n = Integer.parseInt(br.readLine().trim());\n            int[] arr = new int[n];\n            StringTokenizer st = new StringTokenizer(br.readLine());\n            for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());\n            Solution sln = new Solution();\n            System.out.println(sln.reverseArray(arr));\n        }\n    }\n}\n// } Driver Code Ends\n',
        endStub: '',
        userStub:
          'class Solution {\n\n    public String reverseArray(int[] arr) {\n        // Write your logic here\n    }\n\n}\n'
      },
      {
        language: 'cpp',
        startStub:
            '//{ Driver Code Starts\n#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n',
        endStub:
            '};\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        int n;\n        cin >> n;\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        Solution sln;\n        cout << sln.reverseArray(arr) << endl;\n    }\n    return 0;\n}\n// } Driver Code Ends\n',
        userStub:
            '    string reverseArray(vector<int>& arr) {\n        // Write your logic here\n    }\n\n'
        },
        {
        language: 'python',
        startStub:
            '#{ Driver Code Starts\nclass Solution:\n',
        endStub:
            '\nif __name__ == "__main__":\n    t = int(input())\n    for _ in range(t):\n        n = int(input())\n        arr = list(map(int, input().split()))\n        sln = Solution()\n        print(sln.reverseArray(arr))\n#} Driver Code Ends\n',
        userStub:
            '    def reverseArray(self, arr):\n        # Write your logic here\n        pass\n\n'
        }
    ]
}
];

async function seedIfNeeded() {
  try {
    const problemCount = await Problem.countDocuments();

    if (problemCount > 0) {
      logger.info(
        `Seed skipped. Database already contains ${problemCount} problems.`
      );
      return;
    }

    logger.info("Database is empty. Inserting sample problems...");

    await Problem.insertMany(sampleProblems);

    logger.info(
      `Seed completed. Inserted ${sampleProblems.length} sample problems.`
    );
  } catch (error) {
    logger.error("Seed failed", error);
    throw error;
  }
}

module.exports = seedIfNeeded;