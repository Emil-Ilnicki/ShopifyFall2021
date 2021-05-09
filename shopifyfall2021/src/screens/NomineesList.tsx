import { useState, useEffect, useCallback } from "react";
import { getNominees, deleteNominee } from "../network/API";
import Nominee from "../components/Nominee";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import "../styles/NomineeList.css";
import Modal from "../components/Modal";
import frownFace from "../assets/frown.png";

interface NomineeData {
  title: string;
  year: string;
  poster: string;
}

const NomineesList = () => {
  const [nominees, setNominees] = useState<Array<NomineeData>>([]);
  const [deleteNomineeBtn, setDeleteNomineeBtn] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  let { uuid } = useParams<{ uuid: string }>();

  const handleChange = useCallback(() => setShowModal(!showModal), [showModal]);

  useEffect(() => {
    loadNominees();
  }, [deleteNomineeBtn]);

  const loadNominees = async () => {
    if (uuid === undefined) {
      const response = await getNominees({
        UUID: Cookies.get("UUID"),
      });
      setNominees(response.data as Array<NomineeData>);
    } else {
      const response = await getNominees({
        UUID: uuid,
      });
      setNominees(response.data as Array<NomineeData>);
    }
  };

  return (
    <div>
      <label>
        {" "}
        <b> Nominee List </b>
      </label>
      <div className="nomineeContainer">
        {nominees.length === 0 ? (
          <div className="noNomineeContainer">
            <img className="frownImg" src={frownFace} alt="Frowny Face"></img>
            <p className="noNomineeText">
              <b> There are no nominees. </b>
            </p>
          </div>
        ) : (
          <>
            {" "}
            {nominees.map((nominatedMoive: NomineeData) => (
              <div className="nominatedMovie">
                <Nominee
                  title={nominatedMoive.title}
                  year={nominatedMoive.year}
                  poster={nominatedMoive.poster}
                />
                {uuid === undefined ? (
                  <button
                    className="removeNominee"
                    onClick={async () => {
                      const res = await deleteNominee({
                        UUID: Cookies.get("UUID"),
                        title: nominatedMoive.title,
                      });
                      if (res.msg === "Record Deleted")
                        setDeleteNomineeBtn(!deleteNomineeBtn);
                      else {
                        console.error("Could not delete record");
                      }
                    }}
                  >
                    {" "}
                    Remove Nominee{" "}
                  </button>
                ) : null}
              </div>
            ))}{" "}
          </>
        )}
      </div>
      <div className="btnContainer">
      {uuid === undefined ? (
          <div>
            {" "}
            <Link to="/">
              <button>Go Back</button>
            </Link>
            <button
              onClick={() => {
                handleChange();
              }}
            >
              {" "}
              Generate Link{" "}
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NomineesList;
