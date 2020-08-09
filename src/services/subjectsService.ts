import api from "./api";

interface ISubjectResponse {
  subjects: ISubjectItem[]
}

interface ISubjectItem {
  ds_subject: string,
  id_subject: string
}

export interface ISubjectItemView{
  value: string,
  label: string
}

export default class SubjectsService {
  private async getSubjects(): Promise<ISubjectItem[]>{
    const { data } = await api.get<ISubjectResponse>('subjects')

    return data.subjects
  }

  public async getSubjectsParsedAsItemView(): Promise<ISubjectItemView[]>{
    return (await this.getSubjects()).map(subject => {
      return {
        value: subject.id_subject,
        label: subject.ds_subject
      }
    })
  }
}
