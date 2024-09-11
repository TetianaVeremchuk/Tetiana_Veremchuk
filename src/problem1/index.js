var sum_to_n_g = function(n) {
  let sum = 0;
  let current = 1;
  while (current <= n) {
      sum += current;
      current++;
  }
  return sum;
};

var sum_to_n_a = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
};

var sum_to_n_b = function(n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function(n) {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};
