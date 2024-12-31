#include <bits/stdc++.h>
using namespace std;

const int mod = 1e9 + 7;

int solve(vector<int>& cost, int money, int i, vector<vector<int>>& dp) {
    if (i >= cost.size() || money < 0) {
        return 0;
    }
    
    if (dp[i][money] != -1) {
        return dp[i][money];
    }

    int profitWithout = solve(cost, money, i + 1, dp) % mod;
    int profitWith = 0;

    if (cost[i] <= money) {
        profitWith = (solve(cost, money - cost[i], i + 1, dp) + (1LL << i) % mod) % mod;
    }

    dp[i][money] = max(profitWith, profitWithout) % mod;
    return dp[i][money];
}

int main() {
    int n = 5, money = 70;
    vector<int> cost = {10, 20, 14, 40, 50};
    vector<vector<int>> dp(n, vector<int>(money + 1, -1));

    cout << solve(cost, money, 0, dp) << endl;
    return 0;
}
