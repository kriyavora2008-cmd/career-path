// dsaSheetData.js - Comprehensive Topic-Wise DSA SDE Prep Sheet
export const dsaTopics = [
  "All Topics",
  "Arrays & Hashing",
  "Two Pointers & Strings",
  "Sliding Window",
  "Linked List",
  "Stack & Queue",
  "Binary Search",
  "Trees & BST",
  "Heap & Priority Queue",
  "Graphs",
  "Dynamic Programming",
  "Backtracking & Recursion",
  "Greedy Algorithms",
  "Bit Manipulation"
];

export const dsaProblems = [
  // --- ARRAYS & HASHING ---
  {
    id: "dsa-1",
    title: "Two Sum",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Apple", "Meta", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Constraints:
• 2 <= nums.length <= 10^4
• -10^9 <= nums[i] <= 10^9
• Only one valid answer exists.`,
    intuition: `Use a Hash Map to store elements visited so far along with their array index. For every element nums[i], calculate the needed complement: complement = target - nums[i].
If the complement already exists in the map, we immediately have our pair indices [map.get(complement), i]. Otherwise, record nums[i] into the map.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
    }
  },
  {
    id: "dsa-2",
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    companies: ["Amazon", "Microsoft", "Apple", "Uber"],
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example:
Input: prices = [7,1,5,3,6,4]
Output: 5 (Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5).`,
    intuition: `Traverse the array once while keeping track of the minimum price observed so far (minPrice). At each day, calculate potential profit: prices[i] - minPrice. Update maxProfit if this profit is greater.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for (int p : prices) {
        minPrice = min(minPrice, p);
        maxProfit = max(maxProfit, p - minPrice);
    }
    return maxProfit;
}`,
      java: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice) minPrice = price;
        else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
    }
    return maxProfit;
}`,
      python: `def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit`,
      javascript: `function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`
    }
  },
  {
    id: "dsa-3",
    title: "Maximum Subarray (Kadane's Algorithm)",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft", "LinkedIn"],
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.`,
    intuition: `Kadane's algorithm: Iterate through the array maintaining currentSum. At each step, either extend the previous subarray or start fresh from current number: currentSum = max(num, currentSum + num). Keep track of global maximum.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0], curr = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        curr = max(nums[i], curr + nums[i]);
        maxSoFar = max(maxSoFar, curr);
    }
    return maxSoFar;
}`,
      java: `public int maxSubArray(int[] nums) {
    int max = nums[0], sum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        sum = Math.max(nums[i], sum + nums[i]);
        max = Math.max(max, sum);
    }
    return max;
}`,
      python: `def maxSubArray(nums: list[int]) -> int:
    curr_sum = max_sum = nums[0]
    for x in nums[1:]:
        curr_sum = max(x, curr_sum + x)
        max_sum = max(max_sum, curr_sum)
    return max_sum`,
      javascript: `function maxSubArray(nums) {
    let max = nums[0], sum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        sum = Math.max(nums[i], sum + nums[i]);
        max = Math.max(max, sum);
    }
    return max;
}`
    }
  },
  {
    id: "dsa-4",
    title: "Product of Array Except Self",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    companies: ["Amazon", "Apple", "Meta", "Asana"],
    leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
You must write an algorithm that runs in O(n) time and without using the division operation.`,
    intuition: `Build the answer using prefix and suffix products. In pass 1 from left to right, set answer[i] to prefix product of all numbers before i. In pass 2 from right to left, multiply answer[i] by running suffix product.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1) extra space (output array doesn't count)",
    code: {
      cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    int postfix = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= postfix;
        postfix *= nums[i];
    }
    return res;
}`,
      java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    res[0] = 1;
    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}`,
      python: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    return res`,
      javascript: `function productExceptSelf(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let postfix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= postfix;
        postfix *= nums[i];
    }
    return res;
}`
    }
  },
  {
    id: "dsa-5",
    title: "Merge Intervals",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    companies: ["Google", "Meta", "Bloomberg", "Salesforce"],
    leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    intuition: `Sort intervals by their start time. Iterate through sorted intervals; if the current interval starts before or at the end of the previous merged interval, merge them by updating end = max(prev.end, curr.end). Otherwise, append current interval as a new entry.`,
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged = {intervals[0]};
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}`,
      java: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> res = new ArrayList<>();
    int[] curr = intervals[0];
    res.add(curr);
    for (int[] interval : intervals) {
        if (interval[0] <= curr[1]) {
            curr[1] = Math.max(curr[1], interval[1]);
        } else {
            curr = interval;
            res.add(curr);
        }
    }
    return res.toArray(new int[res.size()][]);
}`,
      python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
      javascript: `function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const last = merged[merged.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            merged.push(intervals[i]);
        }
    }
    return merged;
}`
    }
  },

  // --- TWO POINTERS & STRINGS ---
  {
    id: "dsa-6",
    title: "Valid Palindrome",
    topic: "Two Pointers & Strings",
    difficulty: "Easy",
    companies: ["Meta", "Microsoft", "Uber"],
    leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.`,
    intuition: `Use two pointers: left starting at index 0 and right at index n - 1. Move both inwards skipping non-alphanumeric characters. Compare lowercased characters; if any mismatch occurs, return false.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `bool isPalindrome(string s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;
        if (tolower(s[l]) != tolower(s[r])) return false;
        l++; r--;
    }
    return true;
}`,
      java: `public boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
        while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
        l++; r--;
    }
    return true;
}`,
      python: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower(): return False
        l += 1; r -= 1
    return True`,
      javascript: `function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    const isAlphanumeric = ch => /[a-z0-9]/i.test(ch);
    while (l < r) {
        while (l < r && !isAlphanumeric(s[l])) l++;
        while (l < r && !isAlphanumeric(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++; r--;
    }
    return true;
}`
    }
  },
  {
    id: "dsa-7",
    title: "3Sum",
    topic: "Two Pointers & Strings",
    difficulty: "Medium",
    companies: ["Amazon", "Meta", "Google", "Adobe"],
    leetcodeUrl: "https://leetcode.com/problems/3sum/",
    description: `Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
Notice that the solution set must not contain duplicate triplets.`,
    intuition: `Sort the array first. Iterate through nums with pointer i. For each i, use standard two pointers (left = i + 1, right = n - 1) to find pairs that sum to -nums[i]. Skip duplicate elements on i, left, and right to avoid redundant triplets.`,
    timeComplexity: "O(N^2)",
    spaceComplexity: "O(1) excluding output",
    code: {
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> res;
    sort(nums.begin(), nums.end());
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = nums.size() - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.push_back({nums[i], nums[l], nums[r]});
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`,
      java: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = nums.length - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`,
      python: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]: l += 1
                while l < r and nums[r] == nums[r - 1]: r -= 1
                l += 1; r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return res`,
      javascript: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`
    }
  },
  {
    id: "dsa-8",
    title: "Container With Most Water",
    topic: "Two Pointers & Strings",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Goldman Sachs"],
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
    intuition: `Two pointers at opposite ends (left = 0, right = n-1). Area is min(height[left], height[right]) * (right - left). Since the width narrows on each step, we can only hope to find a bigger area by moving the pointer with the smaller height.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int maxArea(vector<int>& height) {
    int l = 0, r = height.size() - 1, maxW = 0;
    while (l < r) {
        int h = min(height[l], height[r]);
        maxW = max(maxW, h * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return maxW;
}`,
      java: `public int maxArea(int[] height) {
    int l = 0, r = height.length - 1, maxW = 0;
    while (l < r) {
        maxW = Math.max(maxW, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return maxW;
}`,
      python: `def maxArea(height: list[int]) -> int:
    l, r, max_w = 0, len(height) - 1, 0
    while l < r:
        max_w = max(max_w, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]: l += 1
        else: r -= 1
    return max_w`,
      javascript: `function maxArea(height) {
    let l = 0, r = height.length - 1, maxW = 0;
    while (l < r) {
        maxW = Math.max(maxW, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return maxW;
}`
    }
  },

  // --- SLIDING WINDOW ---
  {
    id: "dsa-9",
    title: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Bloomberg", "Google"],
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    description: `Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3 ("abc")`,
    intuition: `Maintain a sliding window [left, right] and a Map storing the most recent index of each character. When character at right is seen inside current window, jump left to map.get(char) + 1. Update max length.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(min(N, M)) where M is alphabet size",
    code: {
      cpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> seen;
    int maxLen = 0, l = 0;
    for (int r = 0; r < s.size(); r++) {
        if (seen.count(s[r]) && seen[s[r]] >= l) {
            l = seen[s[r]] + 1;
        }
        seen[s[r]] = r;
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
      java: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> seen = new HashMap<>();
    int maxLen = 0, l = 0;
    for (int r = 0; r < s.length(); r++) {
        char c = s.charAt(r);
        if (seen.containsKey(c) && seen.get(c) >= l) {
            l = seen.get(c) + 1;
        }
        seen.put(c, r);
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    seen = {}
    max_len = l = 0
    for r, char in enumerate(s):
        if char in seen and seen[char] >= l:
            l = seen[char] + 1
        seen[char] = r
        max_len = max(max_len, r - l + 1)
    return max_len`,
      javascript: `function lengthOfLongestSubstring(s) {
    const map = new Map();
    let maxLen = 0, l = 0;
    for (let r = 0; r < s.length; r++) {
        if (map.has(s[r]) && map.get(s[r]) >= l) {
            l = map.get(s[r]) + 1;
        }
        map.set(s[r], r);
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`
    }
  },
  {
    id: "dsa-10",
    title: "Minimum Window Substring",
    topic: "Sliding Window",
    difficulty: "Hard",
    companies: ["Meta", "Google", "Airbnb", "Uber"],
    leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
    description: `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".`,
    intuition: `Two frequency maps: countT for characters in t, and window for current substring. Expand right until all needed characters match (haveCount == needCount). Then contract from left while maintaining validity, updating smallest window found.`,
    timeComplexity: "O(M + N)",
    spaceComplexity: "O(1) (since alphabet size <= 128)",
    code: {
      cpp: `string minWindow(string s, string t) {
    if (t.empty() || s.empty()) return "";
    unordered_map<char, int> countT, window;
    for (char c : t) countT[c]++;
    int have = 0, need = countT.size();
    int minLen = INT_MAX, resL = -1;
    int l = 0;
    for (int r = 0; r < s.size(); r++) {
        char c = s[r];
        window[c]++;
        if (countT.count(c) && window[c] == countT[c]) have++;
        while (have == need) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                resL = l;
            }
            window[s[l]]--;
            if (countT.count(s[l]) && window[s[l]] < countT[s[l]]) have--;
            l++;
        }
    }
    return resL == -1 ? "" : s.substr(resL, minLen);
}`,
      java: `public String minWindow(String s, String t) {
    if (s.length() < t.length()) return "";
    Map<Character, Integer> target = new HashMap<>();
    for (char c : t.toCharArray()) target.put(c, target.getOrDefault(c, 0) + 1);
    int required = target.size(), formed = 0;
    Map<Character, Integer> window = new HashMap<>();
    int[] ans = {-1, 0, 0}; // len, l, r
    int l = 0;
    for (int r = 0; r < s.length(); r++) {
        char c = s.charAt(r);
        window.put(c, window.getOrDefault(c, 0) + 1);
        if (target.containsKey(c) && window.get(c).intValue() == target.get(c).intValue()) formed++;
        while (l <= r && formed == required) {
            if (ans[0] == -1 || (r - l + 1) < ans[0]) {
                ans[0] = r - l + 1; ans[1] = l; ans[2] = r;
            }
            char leftChar = s.charAt(l);
            window.put(leftChar, window.get(leftChar) - 1);
            if (target.containsKey(leftChar) && window.get(leftChar) < target.get(leftChar)) formed--;
            l++;
        }
    }
    return ans[0] == -1 ? "" : s.substring(ans[1], ans[2] + 1);
}`,
      python: `def minWindow(s: str, t: str) -> str:
    from collections import Counter
    if not t or not s: return ""
    count_t, window = Counter(t), {}
    have, need = 0, len(count_t)
    res, min_len = [-1, -1], float("inf")
    l = 0
    for r, c in enumerate(s):
        window[c] = 1 + window.get(c, 0)
        if c in count_t and window[c] == count_t[c]:
            have += 1
        while have == need:
            if (r - l + 1) < min_len:
                res = [l, r]
                min_len = r - l + 1
            window[s[l]] -= 1
            if s[l] in count_t and window[s[l]] < count_t[s[l]]:
                have -= 1
            l += 1
    l, r = res
    return s[l:r+1] if min_len != float("inf") else ""`,
      javascript: `function minWindow(s, t) {
    if (!s || !t) return "";
    const countT = {};
    for (const c of t) countT[c] = (countT[c] || 0) + 1;
    const window = {};
    let have = 0, need = Object.keys(countT).length;
    let minLen = Infinity, res = [-1, -1], l = 0;
    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        window[c] = (window[c] || 0) + 1;
        if (countT[c] && window[c] === countT[c]) have++;
        while (have === need) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                res = [l, r];
            }
            window[s[l]]--;
            if (countT[s[l]] && window[s[l]] < countT[s[l]]) have--;
            l++;
        }
    }
    return minLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
}`
    }
  },

  // --- LINKED LIST ---
  {
    id: "dsa-11",
    title: "Reverse Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Microsoft", "Adobe", "Apple"],
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]`,
    intuition: `Iterative approach: Use three pointers: prev (initially null), curr (initially head), and nextTemp. While curr is not null, save curr.next, point curr.next to prev, then advance prev to curr, and curr to nextTemp.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      python: `def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      javascript: `function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
    }
  },
  {
    id: "dsa-12",
    title: "Linked List Cycle (Floyd's Tortoise and Hare)",
    topic: "Linked List",
    difficulty: "Easy",
    companies: ["Amazon", "Microsoft", "Spotify", "Goldman Sachs"],
    leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.
Return true if there is some cycle in the linked list. Otherwise, return false.`,
    intuition: `Use Floyd's Cycle Detection Algorithm: slow pointer moves 1 step at a time, fast pointer moves 2 steps. If there is a cycle, fast will eventually lap and meet slow. If fast reaches null, there is no cycle.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      java: `public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      python: `def hasCycle(head: Optional[ListNode]) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      javascript: `function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`
    }
  },
  {
    id: "dsa-13",
    title: "Merge Two Sorted Lists",
    topic: "Linked List",
    difficulty: "Easy",
    companies: ["Amazon", "Apple", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
    description: `You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.`,
    intuition: `Create a dummy node and a tail pointer. While both lists have nodes, attach the node with smaller value to tail.next and advance that list. Attach any remaining nodes once one list is exhausted.`,
    timeComplexity: "O(N + M)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val < l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`,
      java: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}`,
      python: `def mergeTwoLists(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    tail = dummy
    while l1 and l2:
        if l1.val < l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next`,
      javascript: `function mergeTwoLists(l1, l2) {
    const dummy = { val: 0, next: null };
    let tail = dummy;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = l1 || l2;
    return dummy.next;
}`
    }
  },

  // --- STACK & QUEUE ---
  {
    id: "dsa-14",
    title: "Valid Parentheses",
    topic: "Stack & Queue",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Meta", "LinkedIn"],
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if open brackets are closed by the same type of brackets in the correct order.`,
    intuition: `Use a stack. When an opening bracket is encountered, push it. When a closing bracket arrives, check if stack is non-empty and top matches the closing pair. If not, return false. At the end, stack must be empty.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`,
      java: `public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`,
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    return not stack`,
      javascript: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const c of s) {
        if (map[c]) {
            if (stack.pop() !== map[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
}`
    }
  },
  {
    id: "dsa-15",
    title: "Daily Temperatures (Monotonic Stack)",
    topic: "Stack & Queue",
    difficulty: "Medium",
    companies: ["Meta", "Amazon", "Google", "Bloomberg"],
    leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
    description: `Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.`,
    intuition: `Maintain a monotonic decreasing stack of indices. When the current temperature is higher than the temperature at the index at the top of the stack, pop it and record the difference (curr_index - prev_index) in answer array.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `vector<int> dailyTemperatures(vector<int>& temps) {
    vector<int> res(temps.size(), 0);
    stack<int> st; // stores indices
    for (int i = 0; i < temps.size(); i++) {
        while (!st.empty() && temps[i] > temps[st.top()]) {
            int prevIdx = st.top(); st.pop();
            res[prevIdx] = i - prevIdx;
        }
        st.push(i);
    }
    return res;
}`,
      java: `public int[] dailyTemperatures(int[] temps) {
    int[] res = new int[temps.length];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < temps.length; i++) {
        while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
            int idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }
    return res;
}`,
      python: `def dailyTemperatures(temps: list[int]) -> list[int]:
    res = [0] * len(temps)
    stack = [] # pair: [index]
    for i, t in enumerate(temps):
        while stack and t > temps[stack[-1]]:
            prev = stack.pop()
            res[prev] = i - prev
        stack.append(i)
    return res`,
      javascript: `function dailyTemperatures(temps) {
    const res = new Array(temps.length).fill(0);
    const stack = [];
    for (let i = 0; i < temps.length; i++) {
        while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
            const prev = stack.pop();
            res[prev] = i - prev;
        }
        stack.push(i);
    }
    return res;
}`
    }
  },

  // --- BINARY SEARCH ---
  {
    id: "dsa-16",
    title: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    companies: ["Microsoft", "Google", "Apple"],
    leetcodeUrl: "https://leetcode.com/problems/binary-search/",
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.`,
    intuition: `Standard divide-and-conquer: compute mid = low + (high - low) / 2 to prevent overflow. Compare nums[mid] with target and halve the search space accordingly.`,
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
      java: `public int search(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
      python: `def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: l = mid + 1
        else: r = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
    }
  },
  {
    id: "dsa-17",
    title: "Search in Rotated Sorted Array",
    topic: "Binary Search",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Meta", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    description: `Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.`,
    intuition: `Notice that at least one half of the rotated array is always strictly sorted. If nums[low] <= nums[mid], the left half is sorted. Check if target lies within [nums[low], nums[mid]]. If yes, search left; else search right. Mirror the logic if right half is sorted.`,
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        if (nums[l] <= nums[mid]) { // left sorted
            if (target >= nums[l] && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else { // right sorted
            if (target > nums[mid] && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}`,
      java: `public int search(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        if (nums[l] <= nums[mid]) {
            if (target >= nums[l] && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}`,
      python: `def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] == target: return mid
        if nums[l] <= nums[mid]:
            if nums[l] <= target < nums[mid]: r = mid - 1
            else: l = mid + 1
        else:
            if nums[mid] < target <= nums[r]: l = mid + 1
            else: r = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) return mid;
        if (nums[l] <= nums[mid]) {
            if (nums[l] <= target && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}`
    }
  },

  // --- TREES & BST ---
  {
    id: "dsa-18",
    title: "Invert Binary Tree",
    topic: "Trees & BST",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Twitter"],
    leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
    description: `Given the root of a binary tree, invert the tree (mirror image), and return its root.`,
    intuition: `Recursively swap root.left and root.right, then recurse on the inverted subtrees. Base case: if root is null, return null.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(H) recursion stack where H is tree height",
    code: {
      cpp: `TreeNode* invertTree(TreeNode* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    invertTree(root->left);
    invertTree(root->right);
    return root;
}`,
      java: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}`,
      python: `def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    if not root: return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
      javascript: `function invertTree(root) {
    if (!root) return null;
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}`
    }
  },
  {
    id: "dsa-19",
    title: "Validate Binary Search Tree",
    topic: "Trees & BST",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Facebook", "Bloomberg"],
    leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).
A valid BST is defined as follows:
• The left subtree contains only nodes with keys strictly less than the node's key.
• The right subtree contains only nodes with keys strictly greater than the node's key.
• Both the left and right subtrees must also be binary search trees.`,
    intuition: `Validate using bounding range (minVal, maxVal). Every node must satisfy minVal < node.val < maxVal. When moving left, update maxVal = node.val. When moving right, update minVal = node.val.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    code: {
      cpp: `bool isValidBST(TreeNode* root, long minV = LONG_MIN, long maxV = LONG_MAX) {
    if (!root) return true;
    if (root->val <= minV || root->val >= maxV) return false;
    return isValidBST(root->left, minV, root->val) && 
           isValidBST(root->right, root->val, maxV);
}`,
      java: `public boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}
private boolean validate(TreeNode node, Integer min, Integer max) {
    if (node == null) return true;
    if ((min != null && node.val <= min) || (max != null && node.val >= max)) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
}`,
      python: `def isValidBST(root: Optional[TreeNode]) -> bool:
    def valid(node, left, right):
        if not node: return True
        if not (left < node.val < right): return False
        return valid(node.left, left, node.val) and valid(node.right, node.val, right)
    return valid(root, float('-inf'), float('inf'))`,
      javascript: `function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`
    }
  },
  {
    id: "dsa-20",
    title: "Lowest Common Ancestor of a Binary Search Tree",
    topic: "Trees & BST",
    difficulty: "Medium",
    companies: ["Amazon", "LinkedIn", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.`,
    intuition: `Exploit BST property: If both p and q are strictly less than root, LCA must be in left subtree. If both p and q are strictly greater than root, LCA is in right subtree. If they diverge (one <= root and one >= root), current root is the LCA!`,
    timeComplexity: "O(H)",
    spaceComplexity: "O(1) iterative",
    code: {
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    while (root) {
        if (p->val < root->val && q->val < root->val) root = root->left;
        else if (p->val > root->val && q->val > root->val) root = root->right;
        else return root;
    }
    return nullptr;
}`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
    return null;
}`,
      python: `def lowestCommonAncestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    curr = root
    while curr:
        if p.val > curr.val and q.val > curr.val:
            curr = curr.right
        elif p.val < curr.val and q.val < curr.val:
            curr = curr.left
        else:
            return curr`,
      javascript: `function lowestCommonAncestor(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
    return null;
}`
    }
  },

  // --- GRAPHS ---
  {
    id: "dsa-21",
    title: "Number of Islands",
    topic: "Graphs",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Bloomberg"],
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    intuition: `Iterate through every cell. Whenever a '1' is encountered, increment islands counter and trigger a DFS/BFS traversal to sink the island (mark all 4-directionally connected '1's as '0').`,
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(M * N) worst case recursion stack",
    code: {
      cpp: `void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] != '1') return;
    grid[r][c] = '0'; // sink island
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}
int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int r = 0; r < grid.size(); r++) {
        for (int c = 0; c < grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}`,
      java: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}
private void dfs(char[][] g, int r, int c) {
    if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;
    g[r][c] = '0';
    dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);
}`,
      python: `def numIslands(grid: list[list[str]]) -> int:
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
      javascript: `function numIslands(grid) {
    let count = 0;
    const dfs = (r, c) => {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
    };
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}`
    }
  },
  {
    id: "dsa-22",
    title: "Course Schedule (Topological Sort / Cycle Detection)",
    topic: "Graphs",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
    description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take bi first if you want to take course ai.
Return true if you can finish all courses. Otherwise, return false.`,
    intuition: `This is directed cycle detection / Kahn's algorithm (BFS topological sort). Compute indegrees of all nodes. Push nodes with indegree 0 to queue. While queue has elements, decrement neighbor indegrees. If a neighbor reaches 0, push it. If processed node count equals numCourses, no cycle exists!`,
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    code: {
      cpp: `bool canFinish(int numCourses, vector<vector<int>>& prereqs) {
    vector<vector<int>> adj(numCourses);
    vector<int> indegree(numCourses, 0);
    for (auto& p : prereqs) {
        adj[p[1]].push_back(p[0]);
        indegree[p[0]]++;
    }
    queue<int> q;
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) q.push(i);
    int taken = 0;
    while (!q.empty()) {
        int curr = q.front(); q.pop();
        taken++;
        for (int nxt : adj[curr]) {
            if (--indegree[nxt] == 0) q.push(nxt);
        }
    }
    return taken == numCourses;
}`,
      java: `public boolean canFinish(int numCourses, int[][] prereqs) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    int[] in = new int[numCourses];
    for (int[] p : prereqs) {
        adj.get(p[1]).add(p[0]);
        in[p[0]]++;
    }
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) if (in[i] == 0) q.offer(i);
    int count = 0;
    while (!q.isEmpty()) {
        int curr = q.poll();
        count++;
        for (int nxt : adj.get(curr)) {
            if (--in[nxt] == 0) q.offer(nxt);
        }
    }
    return count == numCourses;
}`,
      python: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    from collections import deque
    adj = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    for dest, src in prerequisites:
        adj[src].append(dest)
        indegree[dest] += 1
    q = deque([i for i in range(numCourses) if indegree[i] == 0])
    count = 0
    while q:
        curr = q.popleft()
        count += 1
        for nxt in adj[curr]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)
    return count == numCourses`,
      javascript: `function canFinish(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    for (const [dest, src] of prerequisites) {
        adj[src].push(dest);
        inDegree[dest]++;
    }
    const q = [];
    for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);
    let count = 0;
    while (q.length) {
        const curr = q.shift();
        count++;
        for (const nxt of adj[curr]) {
            inDegree[nxt]--;
            if (inDegree[nxt] === 0) q.push(nxt);
        }
    }
    return count === numCourses;
}`
    }
  },

  // --- DYNAMIC PROGRAMMING ---
  {
    id: "dsa-23",
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    difficulty: "Easy",
    companies: ["Amazon", "Apple", "Google"],
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    intuition: `This is the Fibonacci sequence: ways(n) = ways(n-1) + ways(n-2). Keep two rolling variables a and b to achieve O(1) space.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
      java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int next = a + b;
        a = b;
        b = next;
    }
    return b;
}`,
      python: `def climbStairs(n: int) -> int:
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
      javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`
    }
  },
  {
    id: "dsa-24",
    title: "Coin Change",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Walmart", "Bloomberg"],
    leetcodeUrl: "https://leetcode.com/problems/coin-change/",
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.`,
    intuition: `Bottom-up DP table: dp[a] = min coins to make amount a. Initialize dp with amount + 1. Base case dp[0] = 0. For each amount from 1 to total, and for each coin, dp[a] = min(dp[a], 1 + dp[a - coin]).`,
    timeComplexity: "O(amount * len(coins))",
    spaceComplexity: "O(amount)",
    code: {
      cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int c : coins) {
            if (a - c >= 0) {
                dp[a] = min(dp[a], 1 + dp[a - c]);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int c : coins) {
            if (a - c >= 0) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      python: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != amount + 1 else -1`,
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (let a = 1; a <= amount; a++) {
        for (const c of coins) {
            if (a - c >= 0) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
    }
  },
  {
    id: "dsa-25",
    title: "Longest Increasing Subsequence (LIS)",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.`,
    intuition: `Patience sorting with binary search (O(N log N)): Maintain a tails array where tails[i] stores the smallest tail of all increasing subsequences of length i+1. For each num, use binary search (std::lower_bound) to find its insertion point or extend the tails array.`,
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
      java: `public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
        int idx = Collections.binarySearch(tails, x);
        if (idx < 0) idx = -(idx + 1);
        if (idx == tails.size()) tails.add(x);
        else tails.set(idx, x);
    }
    return tails.size();
}`,
      python: `def lengthOfLIS(nums: list[int]) -> int:
    import bisect
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`,
      javascript: `function lengthOfLIS(nums) {
    const tails = [];
    for (const x of nums) {
        let l = 0, r = tails.length;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (tails[mid] < x) l = mid + 1;
            else r = mid;
        }
        if (l === tails.length) tails.push(x);
        else tails[l] = x;
    }
    return tails.length;
}`
    }
  },

  // --- BACKTRACKING & RECURSION ---
  {
    id: "dsa-26",
    title: "Subsets (Power Set)",
    topic: "Backtracking & Recursion",
    difficulty: "Medium",
    companies: ["Meta", "Amazon", "Uber", "Apple"],
    leetcodeUrl: "https://leetcode.com/problems/subsets/",
    description: `Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.`,
    intuition: `Backtracking: At each index i, we make a decision to include nums[i] in the current subset, recurse on i + 1, and then backtrack (pop nums[i]) to explore the branch where nums[i] is excluded.`,
    timeComplexity: "O(2^N * N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `void backtrack(int start, vector<int>& nums, vector<int>& curr, vector<vector<int>>& res) {
    res.push_back(curr);
    for (int i = start; i < nums.size(); i++) {
        curr.push_back(nums[i]);
        backtrack(i + 1, nums, curr, res);
        curr.pop_back();
    }
}
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> curr;
    backtrack(0, nums, curr, res);
    return res;
}`,
      java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(0, nums, new ArrayList<>(), res);
    return res;
}
private void backtrack(int start, int[] nums, List<Integer> curr, List<List<Integer>> res) {
    res.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(i + 1, nums, curr, res);
        curr.remove(curr.size() - 1);
    }
}`,
      python: `def subsets(nums: list[int]) -> list[list[int]]:
    res = []
    def backtrack(start, curr):
        res.append(list(curr))
        for i in range(start, len(nums)):
            curr.append(nums[i])
            backtrack(i + 1, curr)
            curr.pop()
    backtrack(0, [])
    return res`,
      javascript: `function subsets(nums) {
    const res = [];
    const backtrack = (start, curr) => {
        res.push([...curr]);
        for (let i = start; i < nums.length; i++) {
            curr.push(nums[i]);
            backtrack(i + 1, curr);
            curr.pop();
        }
    };
    backtrack(0, []);
    return res;
}`
    }
  },

  // --- HEAP & PRIORITY QUEUE ---
  {
    id: "dsa-27",
    title: "Top K Frequent Elements",
    topic: "Heap & Priority Queue",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Meta", "Yelp"],
    leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.`,
    intuition: `Count frequencies using a HashMap. Then either use a min-heap of size k (O(N log K)) or bucket sort by frequency (O(N)): group elements by their count in an array of lists indexed 0 to N, then collect from highest frequency to lowest.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: {
      cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int x : nums) count[x]++;
    vector<vector<int>> buckets(nums.size() + 1);
    for (auto& [val, freq] : count) buckets[freq].push_back(val);
    vector<int> res;
    for (int i = buckets.size() - 1; i >= 0 && res.size() < k; i--) {
        for (int num : buckets[i]) {
            res.push_back(num);
            if (res.size() == k) break;
        }
    }
    return res;
}`,
      java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int n : nums) map.put(n, map.getOrDefault(n, 0) + 1);
    List<Integer>[] bucket = new List[nums.length + 1];
    for (int key : map.keySet()) {
        int freq = map.get(key);
        if (bucket[freq] == null) bucket[freq] = new ArrayList<>();
        bucket[freq].add(key);
    }
    int[] res = new int[k];
    int count = 0;
    for (int i = bucket.length - 1; i >= 0 && count < k; i--) {
        if (bucket[i] != null) {
            for (int val : bucket[i]) {
                res[count++] = val;
                if (count == k) return res;
            }
        }
    }
    return res;
}`,
      python: `def topKFrequent(nums: list[int], k: int) -> list[int]:
    from collections import Counter
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for n, c in count.items():
        buckets[c].append(n)
    res = []
    for i in range(len(buckets) - 1, 0, -1):
        for n in buckets[i]:
            res.append(n)
            if len(res) == k:
                return res
    return res`,
      javascript: `function topKFrequent(nums, k) {
    const map = new Map();
    for (const n of nums) map.set(n, (map.get(n) || 0) + 1);
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, freq] of map.entries()) {
        buckets[freq].push(num);
    }
    const res = [];
    for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
        for (const num of buckets[i]) {
            res.push(num);
            if (res.length === k) return res;
        }
    }
    return res;
}`
    }
  },

  // --- GREEDY ALGORITHMS ---
  {
    id: "dsa-28",
    title: "Jump Game",
    topic: "Greedy Algorithms",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Apple"],
    leetcodeUrl: "https://leetcode.com/problems/jump-game/",
    description: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
Return true if you can reach the last index, or false otherwise.`,
    intuition: `Greedy backward scan: set goal = n - 1. Iterate backwards from n - 2 to 0. If i + nums[i] >= goal, update goal = i. If we reach the beginning with goal == 0, return true.`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `bool canJump(vector<int>& nums) {
    int goal = nums.size() - 1;
    for (int i = nums.size() - 2; i >= 0; i--) {
        if (i + nums[i] >= goal) goal = i;
    }
    return goal == 0;
}`,
      java: `public boolean canJump(int[] nums) {
    int goal = nums.length - 1;
    for (int i = nums.length - 2; i >= 0; i--) {
        if (i + nums[i] >= goal) goal = i;
    }
    return goal == 0;
}`,
      python: `def canJump(nums: list[int]) -> bool:
    goal = len(nums) - 1
    for i in range(len(nums) - 2, -1, -1):
        if i + nums[i] >= goal:
            goal = i
    return goal == 0`,
      javascript: `function canJump(nums) {
    let goal = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (i + nums[i] >= goal) goal = i;
    }
    return goal === 0;
}`
    }
  },

  // --- BIT MANIPULATION ---
  {
    id: "dsa-29",
    title: "Number of 1 Bits (Hamming Weight)",
    topic: "Bit Manipulation",
    difficulty: "Easy",
    companies: ["Apple", "Microsoft", "Amazon"],
    leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/",
    description: `Given a positive integer n, write a function that returns the number of set bits it has (also known as the Hamming weight).`,
    intuition: `Brian Kernighan's Algorithm: n = n & (n - 1) clears the lowest set bit in each iteration. Repeat until n becomes 0. The number of iterations equals the number of set bits.`,
    timeComplexity: "O(number of set bits) <= 32",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
      java: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
      python: `def hammingWeight(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1)
        count += 1
    return count`,
      javascript: `function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}`
    }
  },
  {
    id: "dsa-30",
    title: "Single Number",
    topic: "Bit Manipulation",
    difficulty: "Easy",
    companies: ["Amazon", "Google", "Airbnb"],
    leetcodeUrl: "https://leetcode.com/problems/single-number/",
    description: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    intuition: `Bitwise XOR property: a ^ a = 0 and a ^ 0 = a. XORing all elements together cancels out all duplicate pairs, leaving the unique element behind!`,
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: {
      cpp: `int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int x : nums) res ^= x;
    return res;
}`,
      java: `public int singleNumber(int[] nums) {
    int res = 0;
    for (int x : nums) res ^= x;
    return res;
}`,
      python: `def singleNumber(nums: list[int]) -> int:
    res = 0
    for x in nums: res ^= x
    return res`,
      javascript: `function singleNumber(nums) {
    return nums.reduce((acc, curr) => acc ^ curr, 0);
}`
    }
  }
];

