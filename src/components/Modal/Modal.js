import { setInvoice } from "@/store/reducers/interactions";
import { useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";

function useOutsideAlerter(ref) {
    const dispatch = useDispatch()
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(setInvoice(null))
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

const Modal = () => {
    const {invoice} = useSelector(state => state.interactions)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


  return invoice && (
    <div className="absolute bg-transparent-dark w-full h-full z-30 flex flex-row items-center justify-center" >
        <div ref={wrapperRef} id='content-area' className="bg-white flex flex-col items-center justify-center py-3 px-8 mx-10 rounded-md">
            <QRCode
                          size={256}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          value={"lightning://" + invoice.invoice}
                          viewBox={`0 0 256 256`}
            />
            <h1>Cantidad en satoshis a pagar:</h1> 
        </div>
    </div>
  )
}

export default Modal