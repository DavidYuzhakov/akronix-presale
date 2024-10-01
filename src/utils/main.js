export function calculateTimeLeft(targetTime) {
  const now = new Date();
  const difference = targetTime - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function scrollToBlock (e) {
  e.preventDefault()
  const swap = document.getElementById('form')

  window.scrollTo({
    top: swap.getBoundingClientRect().top + window.scrollY - document.querySelector('.header-wrapper').offsetHeight,
    behavior: 'smooth'
  })
}

export function gotoHandler (e, id) {
  e.preventDefault()
  setIsActive(false)
  
  const block = document.getElementById(id)
  if (block) {
    document.body.classList.remove('lock')
    window.scrollTo({
      top: block.getBoundingClientRect().top + window.scrollY - document.querySelector('.header-wrapper').offsetHeight,
      behavior: 'smooth'
    })
  }
}

export function navHandler (isActive, setIsActive) {
  if (isActive) {
    setIsActive(false)
    document.body.classList.remove('lock')
  } else {
    setIsActive(true)
    document.body.classList.add('lock')
  }
}