// const test = jQuery('.test')
// test.addClass('red').addClass('border')     // 链式操作，关键在于 api 对象中的函数再次返回了 api 对象

// const $child = jQuery('.test').find('.child')
// console.log('$child:', $child)

// jQuery('.test')
//     .addClass('red')
//     .find('.child')
//     .addClass('green')
//     .addClass('blue')
//     .end()
//     .addClass('yellow')
//     .addClass('purple')

// jQuery('.test').find('.child').each((value, index) => {
//     console.log(value, index)
// })

// const x = jQuery('.child').parent()
// x.print()

// const x = jQuery('.test').children()
// x.print()

// const x = $('.test').children()
// x.print()

// console.log($('.test').get(2))

const $p = $('<p>=========</p>')[0]
$('.test').appendTo($p)