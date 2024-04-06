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
import { hasErrorField } from "../../app/utils/has-error-fild"

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0])
    }
  }

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()
        // изменение имени
        data.name && formData.append("name", data.name)

        // проверка email изменили?
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email)

        // дата рождения
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )

        // о себе
        data.bio && formData.append("bio", data.bio)

        // место нахождения
        data.location && formData.append("location", data.location)

        // добавление изображения
        selectedFile && formData.append("avatar", selectedFile)

        // отправка новых данных
        await updateUser({ UserData: formData, id }).unwrap()

        onClose()
      } catch (error) {
        if (hasErrorField(error)) {
          setError(error.data.error)
        }
      }
    }
  }

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
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                  onChange={handleFileChange}
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
