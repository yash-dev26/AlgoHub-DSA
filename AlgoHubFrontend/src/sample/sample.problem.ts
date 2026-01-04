export default {

  problemStatement: `# Problem: Energy-Constrained Robot Walk
<br/>

---
<br/>

## Problem Description

<br/>

A robot is placed on a **1D number line** at position \`start\`.

The robot must make **exactly \`K\` moves**.

On each move, it can choose **one of the following actions**:

  - Move **left by 1** (costs \`1\` unit of energy)
  - Move **right by 1** (costs \`1\` unit of energy)
  - **stay** at the same position (costs \`0\` energy)

<br/>

![image](https://i.pinimg.com/736x/21/2e/5f/212e5f17978df344781061ab9f89b36d.jpg)

<br/>

The robot starts with **\`E\` units of energy**.

If at any point the robot’s energy becomes **negative**, that movement sequence is considered **invalid**.

<br/>

---
<br/>

## Task
<br/>

Return the **total number of valid movement sequences** of length \`K\` such that:

- The robot’s position is **never less than \`0\`**
- The robot’s energy is **never negative**
- The robot completes **exactly \`K\` moves**
<br/>
---
<br/>

## Input/Output 
<details>
<summary> <b>Test Case 1</b> </summary>

**Input:**  
\`start = 1, K = 2, E = 2\`

**Output:**  
\`6\`

</details>

---
<br/>

## Example
<br/>

Input: \`start = 1, K = 2, E = 2\`  
Output: \`6\`
`
}
