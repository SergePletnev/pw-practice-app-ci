function removeDuplicates(nums) {
    const indexes = [0]
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] !== nums[i - 1]) {
            indexes.push(i)
        }
    }
    for(let i = 0; i < indexes.length; i++) {
        let tmp = nums[indexes[i]]
        nums[i] = tmp
    }
    console.log(nums)
    return indexes.length
}

const my_ar = [1, 2, 2, 2, 3, 3, 5, 5]
console.log(removeDuplicates(my_ar))

function majorityElement(nums) {
    тгьыюыщке((фб и) => и - ф)
    куегкт тгьыхЬферюадщщк(тгьыюдутпер | 2)`
};
