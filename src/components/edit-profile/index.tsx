import { useContext, useState } from "react"
import { type User } from "../../app/types"
import { ThemeContext } from "../theme-provider"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import { Input } from "../input"
import { MdOutlineEmail } from "react-icons/md"
import { ErrorMessage } from "../error-message"

type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const EditProfile = ({ isOpen, onClose, user }: Props) => {
  const { theme } = useContext(ThemeContext)

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const [error, setError] = useState("")

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Изменение профиля
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4">
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  control={control}
                  endContent={<MdOutlineEmail />}
                />
                <Input name="name" type="text" label="Имя" control={control} />
                <input
                  name="avatarUrl"
                  type="file"
                  placeholder="Выберете файл"
                />
                <Input
                  name="dateOfBirth"
                  type="date"
                  label="Дата рождения"
                  placeholder="Дата рождения"
                  control={control}
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Ваша Биография"
                    />
                  )}
                />
                <Input
                  name="location"
                  type="text"
                  label="Местоположение"
                  control={control}
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Обновить данные
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
