import './ButtonFirstPage.css'

const ButtonFirstPage = ({children, id, link, className = ''}) => {
  return (
    <div className='button_first_page'>
        <button className={className} id={id}><a href={link}>{children}</a></button>
    </div>
  )
}

export default ButtonFirstPage