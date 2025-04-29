setInterval(()=>{
    const hh = document.getElementById('hh'),
        mm = document.getElementById('mm'),
        ss = document.getElementById('ss'),
        sec_dot = document.querySelector('.sec_dot'),
        min_dot = document.querySelector('.min_dot'),
        hr_dot = document.querySelector('.hr_dot'),
        hours = document.getElementById('hours'),
        minutes = document.getElementById('minutes'),
        seconds = document.getElementById('seconds'),
        ampm = document.getElementById('ampm');
  
  
  
  
  let h = new Date().getHours(),
        m = new Date().getMinutes(),
        s = new Date().getSeconds();
    let am = h >= 12 ? 'PM' : 'AM';
    // 24小时 转换为 12小时
    if (h > 12) {
      h = h-12
    }
    // 个位数 前面加 0
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    hours.innerHTML = h
    minutes.innerHTML = m
    seconds.innerHTML = s
    ampm.innerHTML = am
    hh.style.strokeDashoffset = 510 - (510 * h) / 12;
    // 12 hrs clock
    mm.style.strokeDashoffset = 630 - (630 * m) / 60;
    // 60 minutes
    ss.style.strokeDashoffset = 760 - (760 * s) / 60;
    sec_dot.style.transform = `rotateZ(${s * 6}deg)`
    // 360/ 60秒 = 6
    min_dot.style.transform = `rotateZ(${m * 6}deg)`
    // 360/ 60分钟 = 6
    hr_dot.style.transform = `rotateZ(${h * 30}deg)`
    // 360/ 12小时 = 30
  })

   