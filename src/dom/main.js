// let div1 = dom.create('<div>11111</div>')
// let div2 = dom.create('<div>22222</div>')

// dom.after(test, div1)
// dom.before(test, div2)

// dom.append(test, div2)

// let parent = dom.create('<div id="parent"></div>')
// dom.wrap(test, parent)

// dom.remove(test)

// let nodes = dom.empty(window.empty)
// console.log('nodes:', nodes)

// dom.attr(test, 'title', 'Hi, I am dongdong')
// const title = dom.attr(test, 'title')
// console.log('title:', title)

// dom.text(test, '我是董董')
// const text = dom.text(test)
// console.log('text:', text)

// dom.html(test, '<p>我是段落一</p>')
// const html = dom.html(test)
// console.log('html:', html)

// dom.style(test, {border: '1px solid red', color: 'blue'})
// const border = dom.style(test, 'border')
// console.log('border:', border)
// dom.style(test, 'border', '10px solid green')

// dom.class.add(test, 'test')
// dom.class.add(test, 'test1')
// dom.class.add(test, 'test2')
// dom.class.remove(test, 'test')
// const hasTest = dom.class.has(test, 'test')
// const hasTest1 = dom.class.has(test, 'test1')
// console.log('hasTest:', hasTest)
// console.log('hasTest1:', hasTest1)

// dom.on(test, 'click', function xxx() {
//     console.log('点击了')
//     dom.off(test, 'click', xxx)
// })

// const test = dom.find('#test')[0]
// console.log('test:', test)
// const red = dom.find('.red', test)[0]
// console.log('red:', red)

// const testParent = dom.parent(test)
// console.log('testParent:', testParent)

// const testChildren = dom.children(test)
// console.log('testChildren:', testChildren)

// const red = dom.find('#test > .red')[0]
// const siblings = dom.siblings(red)
// for (let i = 0; i < siblings.length; i ++) {
//     console.log('siblings[i].innerText:', siblings[i].innerText)
// }

// const red = dom.find('#test > p:last-child')[0]
// console.log('dom.next(red):', dom.next(red))

// const p4 = dom.find('#test > p:first-child')[0]
// console.log('dom.previous(p4):', dom.previous(p4))

// const test = dom.find('#test')[0]
// const nodeList = dom.children(test)
// dom.each(nodeList, (n) => {
//     dom.style(n, 'border', '1px solid red')
// })

// const test = dom.find('#test > p:nth-child(3)')[0]
// console.log(`dom.index('#test'):`, dom.index(test))