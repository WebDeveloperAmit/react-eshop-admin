
const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bottom-page">
        <div className="body-text">Copyright © { currentYear } WebLayerSolution</div>
      </div>
    </>
  )
}

export default Footer