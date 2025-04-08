import Card from '@/components/ui/Card'
import { UserScholarDetails } from '@/@types/scholar'

type DetailsSectionProps = {
    data: UserScholarDetails
}

const DetailsSection = ({ data }: DetailsSectionProps) => {
    return (
        <>
            <h6 className="mt-8">Scholar Details</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Card>
                    <div className="font-bold heading-text">
                        Personal Information
                    </div>
                    <div className="mt-4 flex flex-col gap-1 font-semibold">
                        <span>
                            Name: {data.user.first_name} {data.user.last_name}
                        </span>
                        <span>Email: {data.user.email}</span>
                        <span>
                            Date of Birth:{' '}
                            {new Date(data.dob).toLocaleDateString()}
                        </span>
                        <span>Gender: {data.gender}</span>
                        <span>
                            Number of Children: {data.number_of_children}
                        </span>
                    </div>
                </Card>

                <Card>
                    <div className="font-bold heading-text">
                        Emergency Contact
                    </div>
                    <div className="mt-4 flex flex-col gap-1 font-semibold">
                        <span>Name: {data.emergency_contact_name}</span>
                        <span>Phone: {data.emergency_contact_phone}</span>
                        <span>
                            Relationship: {data.emergency_contact_relationship}
                        </span>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default DetailsSection
