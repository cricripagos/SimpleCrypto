
const StepWrapper = ({children, style}) => {
  return (
    <div className="flex flex-col justify-between" style={style}>
        {children}
    </div>
  )
}

export default StepWrapper