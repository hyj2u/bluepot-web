/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { Button, Input, Txt } from "@/_ui"; // 필요한 UI 컴포넌트 가져오기
import { Modal } from "@/_ui"; // Modal 컴포넌트 가져오기
import { V } from "@/_ui";
import { updatePassword } from "@/_https/auth"; // 비밀번호 변경 API 호출 함수
import { useRouter } from "next/router";
import { useJenga } from "@/_ui/JengaProvider"; // useJenga 훅 사용
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
  theme = "light",
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [lengthError, setLengthError] = useState("");
  const { addToast } = useJenga(); // useJenga에서 addToast 가져오기
  const { useMutation, axiosInstance } = useTanstackQuery();

  // 비밀번호 변경 API 호출 로직
  const { mutate: changePassword } = useMutation({
    mutationFn: (newPassword: string) =>
      updatePassword({ axiosInstance, newPassword }), // 비밀번호 변경 API 호출 시 객체 형태로 전달
    onSuccess: (data) => {
      console.log("비밀번호 변경 성공", data);
      addToast({ title: "비밀번호가 성공적으로 변경되었습니다." });
      onClose(); // 성공 시 모달 닫기
    },
    onError: (err: any) => {
      console.error("비밀번호 변경 실패", err);
      addToast({
        status: "failed",
        title: "비밀번호 변경에 실패했습니다.",
        description: "다시 한번 시도해 주세요.",
      });
    },
  });

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 비밀번호 입력 필드 초기화
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setLengthError("");
    }
  }, [isOpen]);

  // 비밀번호 변경 처리 함수
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      setLengthError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    // 비밀번호 변경 API 호출
    changePassword(newPassword);
  };

  // 모달이 닫힐 때 로그인 로직을 차단하는 함수
  const handleModalClose = () => {
    setNewPassword(""); // 상태 초기화
    setConfirmPassword("");
    setError("");
    setLengthError("");
    onClose(); // 모달 닫기
  };

  return (
    <Modal open={isOpen} onCancel={handleModalClose} theme={theme}>
      <Txt as="h6" style={{ marginBottom: 20 }}>
        비밀번호 변경
      </Txt>

      <V.Container gap={16}>
        <Input label="새 비밀번호">
          <Input.TextField
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (e.target.value.length < 8) {
                setLengthError("비밀번호는 8자 이상이어야 합니다.");
              } else {
                setLengthError("");
              }
            }}
          />
        </Input>

        <Input label="비밀번호 확인">
          <Input.TextField
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (e.target.value !== newPassword) {
                setLengthError("비밀번호가 일치하지 않습니다.");
              } else {
                setLengthError("");
              }
            }}
          />
        </Input>
      </V.Container>

      {lengthError && (
        <Txt color="red" style={{ marginTop: 10 }}>
          {lengthError}
        </Txt>
      )}
      {error && <Txt color="red">{error}</Txt>}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 20,
          gap: 10,
        }}
      >
        <Button
          onClick={handleChangePassword}
          disabled={newPassword.length < 8 || newPassword !== confirmPassword}
        >
          비밀번호 변경
        </Button>
        <Button
          onClick={handleModalClose} // 취소 버튼에서 handleModalClose 실행
          style={{
            backgroundColor: "#f0f0f0", // 연한 회색 배경색
            color: "#999", // 회색 텍스트 색상
            border: "1px solid #f0f0f0", // 테두리 색상도 배경과 동일하게
          }}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default PasswordChangeModal;
