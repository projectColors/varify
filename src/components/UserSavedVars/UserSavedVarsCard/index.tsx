import { useContext, useEffect, useState } from "react";
import { IUserSavedVars } from "../../../providers/@types";
import StyledUserSavedVarsCards from "./style";
import copyIcon from "../../../assets/copy.svg";
import trashIcon from "../../../assets/trash.svg";
import { useCopyToClipboard } from "usehooks-ts";
import { VarContext } from "../../../providers/VarContext";
import { ToastifyContext } from "../../../providers/ToastifyContext";

const UserSavedVarsCard = ({ favorite }: IUserSavedVars) => {
  const { toastify } = useContext(ToastifyContext);

  const [colorPrimiryCardBack, setcolorPrimiryCardBack] = useState<
    string | undefined
  >("");
  const [colorSecondaryCardBack, setcolorSecondaryCardBack] = useState<
    string | undefined
  >("");
  const [colorTertiaryCardBack, setcolorTertiaryCardBack] = useState<
    string | undefined
  >("");

  const { globalVarGenerator } = useContext(VarContext);

  const [value, copy] = useCopyToClipboard();

  useEffect(() => {
    setcolorPrimiryCardBack(favorite?.colorPrimary);
    setcolorSecondaryCardBack(favorite?.colorSecondary);
    setcolorTertiaryCardBack(favorite?.colorTertiary);
  }, []);

  return (
    <StyledUserSavedVarsCards>
      <div className="content__wrapper">
        <p style={{ backgroundColor: colorPrimiryCardBack }}>
          {favorite?.colorPrimary}
        </p>
        <p style={{ backgroundColor: colorSecondaryCardBack }}>
          {favorite?.colorSecondary}
        </p>
        <p style={{ backgroundColor: colorTertiaryCardBack }}>
          {favorite?.colorTertiary}
        </p>
      </div>
      <button className="button__delete">
        <img src={trashIcon} alt="delete saved variables" />
      </button>
      <button className="button__clipboard">
        <img
          src={copyIcon}
          alt="copy to clipboard"
          onClick={() => {
            copy(globalVarGenerator(favorite));
            toastify("success", "Variáveis copiadas com sucesso");
          }}
        />
      </button>
    </StyledUserSavedVarsCards>
  );
};

export default UserSavedVarsCard;
