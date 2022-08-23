//为啥要定义一个立即执行函数 多个js情况？
//还有两个bug 一个是退回到+后按+会变成0+    一个是5.2+ 退回到5. 之后不能正常显示


; (function () {
    // let shanchuflag = 0;//标记当前是否为点击了删除后的状态
    let tempnum = []//撤销专用 24.56+  撤销 保留56
    let tempnum2 = []
    let tempval = ''//撤销专用
    let tempval2 = ''
    let zhengshu = 0
    let flag = 0 //标记当前是否为加减符号状态
    let xiaoshu = 0;//标记当前是否为小数状态
    let nowval = ''
    let showval = ''
    let num = [] //这个是用来临时装的 每次点运算符号之前
    let number = []
    let fuhao = []
    $content = $('#content')
    $sum = $('#sum')

    $('.main').on('click', '.number', function () {
        flag = 0
        // console.log('测试nowval', nowval)
        num.push(+$(this).attr('id'))
        console.log('nowval', nowval)
        console.log(shownumber(zhengshu))
        $content.val(nowval + shownumber(zhengshu))
        // console.log('num', num)
        //此时是字符串形式
        //应该先加入数组里面
        tempnum = num

        if (xiaoshu === 0) tempnum2 = num

        console.log('按数字时候的number', number)
        // console.log('按数字的zhengshu', zhengshu)
        // console.log('按数字后num', num)
        // console.log('按数字后nowval', nowval)

        // tempval = $content.val()
        //如何将[1,2,3]变成123
    })

    $('.main').on('click', '.function', function () {
        // if (flag === 1 || flag === 0 && num.length === 0) return

        if (flag === 0)
            tempval = nowval


        // console.log('tempval:', tempval)


        if (number.length == 0 && num.length == 0)
            number.push(shownumber(zhengshu))

        if (flag === 0 && num.length > 0)
            number.push(shownumber(zhengshu))

        if (flag === 1) {
            nowval = nowval.substring(0, nowval.length - 1)
        }
        // console.log('进入函数前nowval', nowval)


        showfuhao(this)

        console.log('+-number', number)

        nowval = $content.val()
        tempval2 = nowval

        // console.log('末尾更新了nowval', nowval)
        // console.log('temp', tempval)
        console.log('按下+号后nowval', nowval)
        num = []
        // console.log('number', number)
        zhengshu = 0
        xiaoshu = 0
        //如何将[1,2,3]变成123
    })

    $('.main').on('click', '.calculate', function () {

        nowval = $content.val()
        number.push(shownumber(zhengshu))
        console.log('number:', number)

        jisuan(fuhao, number)
        $content.val(number[0])
        $sum.val(nowval + '=')
        nowval = number[0]
        num = []
        fuhao = []
        zhengshu = 0
        shanchuflag = 0

        // console.log('num:', num)
        // console.log('number:', number)

    })

    // $('.main').on('click', '.kuhao', function () {
    //     //排除一些特殊情况 错误就按不动
    //     //只能在符号后面按吗？
    //     showkuhao(this)
    //     nowval = $content.val()
    //     console.log(nowval)

    // })
    $('.main').on('click', '.dian', function () {
        //只能在数字后面 其他按不动
        let showval = $content.val()
        if (showval.endsWith('+') || showval.endsWith('-') || showval.endsWith('×') || showval.endsWith('÷') || showval.endsWith('%') || num.length === 0 || xiaoshu === 1)
            return;

        tempval = nowval

        //这么蠢吗

        console.log('小数点的number', number)
        $content.val(showval + '.')
        zhengshu = shownumber()

        num = []
        xiaoshu = 1

        // console.log('按了小数点后num:', num)


        // console.log('按了小数点后number:', number)
        // console.log('按了小数点后zhengshu:', zhengshu)

    })
    $('.main').on('click', '#delete', function () {


        nowval = tempval
        // console.log('原来', nowval)
        let tempppp = $content.val()
        if ($content.val().endsWith('+') || $content.val().endsWith('-') || $content.val().endsWith('×') || $content.val().endsWith('÷') || $content.val().endsWith('%')) {

            fuhao.pop()
            tempppp = tempppp.substring(0, tempppp.length - 1)
            flag = 0
            // console.log(nowval)
            //检查最后一个number 如果是小数恢复小数状态 将目前的小数全部返回到num里面
            let str = number[number.length - 1].toString()
            if (str.includes('.')) {
                xiaoshu = 1
                //整数部分要保留

                //查找当前number小数点后的所有 赋值给num
                let position = str.indexOf('.')
                zhengshu = Number(str.slice(0, position))

                str = str.slice(position + 1, str.length).split('')
                num = str.map((item) => Number(item))
                console.log(num)
                number.pop()

                //要把nowval更新到上一个运算符号之后


            }

            else {
                number.pop()
            }

            // num = tempnum
            console.log('撤销后的tempnum', num)

            $content.val(tempppp)
            // console.log('撤销后的nowval', nowval)

        }
        else if ($content.val().endsWith('.')) {

            xiaoshu = 0
            tempppp = tempppp.substring(0, tempppp.length - 1)

            zhengshu = 0
            //不能这么写
            // number.pop()
            //要把num给全部恢复 用tempnum不对
            // console.log('删除小数点后number', number)
            // console.log('删除小数点后tempnum', tempnum)
            num = tempnum2

            $content.val(tempppp)

        }

        else if ($content.val().endsWith('1') || $content.val().endsWith('2') || $content.val().endsWith('3') || $content.val().endsWith('4') || $content.val().endsWith('5') || $content.val().endsWith('6') || $content.val().endsWith('7') || $content.val().endsWith('8') || $content.val().endsWith('9')) {
            tempppp = tempppp.substring(0, tempppp.length - 1)
            // console.log('删除前num是多少', num)
            num.pop()
            // console.log('删除后num是多少', num)
            // nowval = tempval2

            //我忘了这行代码之前是做什么的了
        }
        // console.log('num', num)
        // nowval = tempval
        // console.log('删除后nowval', nowval)

        if (tempppp === '') $content.val(0)
        else $content.val(tempppp)
        // console.log('删除操作后num', num)
        // console.log('删除操作后tempnum', tempnum)
        // nowval = tempval
        // console.log('删除后的number:', number)
        console.log('删除的number', number)
        console.log('删除的num', num)

        console.log('删除后nowval', nowval)
    })

    $('.main').on('click', '#AC', function () {
        //全部重置  应该封装成为一个函数
        flag = 0
        xiaoshu = 0
        nowval = 0
        num = []
        fuhao = []
        number = []
        $sum.val('')
        $content.val(nowval)
        // console.log('num', num)
        // console.log('number', number)
        //如何将[1,2,3]变成123
    })

    function shownumber(zhengshu = 0) {
        let total = 0

        for (let i = 0; i < num.length; i++) {

            total = total + num[i] * Math.pow(10, num.length - i - 1)

        }


        // console.log('num', num)
        if (xiaoshu === 1) total = (total) / (Math.pow(10, num.length))
        console.log('total', total)
        return (total * 1000000000 + zhengshu * 1000000000) / 1000000000
    }



    function showfuhao(that) {


        switch ($(that).attr('id')) {
            //这里nowval要搞成tempval
            case 'jia':
                // if (shanchu == 1)
                if (flag === 0)
                    $content.val(nowval + shownumber(zhengshu) + '+')
                if (flag === 1) {
                    fuhao.pop()
                    $content.val(nowval + '+')
                }
                flag = 1
                fuhao.push('+')
                break
            case 'jian':
                if (flag === 0)
                    $content.val(nowval + shownumber(zhengshu) + '-')
                if (flag === 1) {
                    fuhao.pop()
                    $content.val(nowval + '-')
                }
                flag = 1
                fuhao.push('-')
                break
            case 'cheng':

                if (flag === 0)

                    $content.val(nowval + shownumber(zhengshu) + '×')
                if (flag === 1) {
                    fuhao.pop()
                    $content.val(nowval + '×')
                }
                flag = 1
                fuhao.push('×')
                break
            case 'chu':

                if (flag === 0)
                    $content.val(nowval + shownumber(zhengshu) + '÷')
                if (flag === 1) {
                    fuhao.pop()
                    $content.val(nowval + '÷')
                }
                flag = 1
                fuhao.push('÷')
                break
            case 'quyu':

                if (flag === 0)
                    $content.val(nowval + shownumber() + '%')
                if (flag === 1) {
                    fuhao.pop()
                    $content.val(nowval + '%')
                }
                flag = 1
                fuhao.push('%')
                break


        }

        // console.log('fuhao', fuhao)

    }


    function jisuan(fuhao, number) {
        if (fuhao.length == 0) {

            return number[0]
        }
        for (let i = 0; i < fuhao.length; i++) {
            if (fuhao[i] === '×') {

                number[i] = (number[i] * 1000000000) * (number[i + 1] * 1000000000) / 1000000000000000000
                number.splice(i + 1, 1)
                fuhao.splice(i, 1)
                // console.log(number)
                // console.log(fuhao)

            }
            if (fuhao[i] === '÷') {

                number[i] = ((number[i] * 1000000000) / (number[i + 1] * 1000000000))
                number.splice(i + 1, 1)
                fuhao.splice(i, 1)
            }
            // console.log(number)
            // console.log(fuhao)

            if (fuhao[i] === '%') {

                number[i] = (number[i] * 1000000000) % (number[i + 1] * 1000000000) / 1000000000
                number.splice(i + 1, 1)
                fuhao.splice(i, 1)

            }
        }
        for (let i = 0; i < fuhao.length; i++) {
            if (fuhao[i] === '+') {

                number[i] = ((number[i] * 1000000000) + (number[i + 1] * 1000000000)) / 1000000000
                number.splice(i + 1, 1)
                fuhao.splice(i, 1)
                // console.log(number)
                // console.log(fuhao)

            }
            if (fuhao[i] === '-') {

                number[i] = ((number[i] * 1000000000) - (number[i + 1] * 1000000000)) / 1000000000
                number.splice(i + 1, 1)
                fuhao.splice(i, 1)
                // console.log(number)
                // console.log(fuhao)

            }


        }

        //要递归调用

        jisuan(fuhao, number)
    }

    // function showkuhao(that) {
    //     switch ($(that).attr('id')) {
    //         case 'left':
    //             fuhao.push('(')
    //             $content.val(nowval + '(')
    //             break;
    //         case 'right':
    //             fuhao.push(')')
    //             $content.val(nowval + shownumber() + ')')
    //             break;
    //     }

    //     console.log(fuhao)
    // }
})()