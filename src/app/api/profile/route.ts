import {
    NextRequest,
    NextResponse,
  } from "next/server";
  import { ProfileType } from "@/utils/schemas/profileSchema";
  import { createClient } from "@/lib/supabase/server";

  export async function POST(
    req: NextRequest
  ) {
    const payload: ProfileType = await req.json();
    if (
      !payload
    ) {
      return NextResponse.json(
        {
          message:
            " payload not received",
        },
        {
          status: 400,
        }
      );
    }
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id;
    if(!userId){
      return NextResponse.json(
        {
          message:
            "User not found",
        },
      );
    }
    const {data:profileData, error:profileError} = await supabase.from("profiles").insert([{
        user_id:userId,
        education: {
            fieldName: payload?.education?.fieldName,
            lineItem: payload?.education?.lineItem?.map((item)=>{
                return{
                    ...item,
                    startDate: item?.startDate?.toISOString(),
                    endDate: item?.endDate?.toISOString(),

                }
            }),
        },
        work_experience: {
            fieldName: payload?.workExperience?.fieldName,
            lineItem: payload?.workExperience?.lineItem?.map((item)=>{
                return{
                    ...item,
                    startDate: item?.startDate?.toISOString(),
                    endDate: item?.endDate?.toISOString(),
                }
            }),
        },
        template: payload?.template,
        section_order: payload?.sectionOrder,
        custom_sections: payload?.customSections,
        personal_details: payload?.personalDetails,
        role_details: payload?.roleDetails,
        skills: payload?.skills,
    }])
    if (
        profileError
    ) {
      console.log(
        profileError
      );
      return NextResponse.json(
        {
          error: profileError,
        },
        {
          status: 500,
        }
      );
    } else
      return NextResponse.json(
        {
          message:
            "Success",
          data: profileData,
        },
        {
          status: 200,
        }
      );
  }
  
//   export async function PUT(
//     req: NextRequest
//   ) {
//     const {
//       resume,
//       id,
//     }: {
//       resume: ProfileType;
//       id: string;
//     } = await req.json();
//     if (
//       !resume ||
//       !id
//     ) {
//       return NextResponse.json(
//         {
//           message:
//             "UPDATE  payload not received",
//         },
//         {
//           status: 400,
//         }
//       );
//     }
  
//     const {
//       data,
//       errors,
//     } = await cookieBasedClient.models.Profile.update(
//       {
//         id: id,
//         resume: {
//           sectionOrder:
//             resume?.sectionOrder,
//           personalDetails:
//             resume?.personalDetails,
//           roleDetails: {
//             ...resume?.roleDetails,
//             linkedInURL:
//               resume
//                 ?.roleDetails
//                 ?.linkedInURL ||
//               undefined,
//           },
//           education: {
//             fieldName:
//               resume
//                 ?.education
//                 ?.fieldName,
//             lineItem: resume?.education?.lineItem?.map(
//               (
//                 items
//               ) => {
//                 return {
//                   ...items,
//                   startDate: items?.startDate
//                     ? new Date(
//                         items?.startDate
//                       )?.toISOString()
//                     : "",
//                   endDate:
//                     items?.endDate &&
//                     new Date(
//                       items?.endDate
//                     )?.toISOString(),
//                 };
//               }
//             ),
//           },
//           workExperience: {
//             fieldName:
//               resume
//                 ?.workExperience
//                 ?.fieldName ||
//               "",
//             lineItem: resume?.workExperience?.lineItem?.map(
//               (
//                 items
//               ) => {
//                 return {
//                   ...items,
//                   startDate: items?.startDate
//                     ? new Date(
//                         items?.startDate
//                       )?.toISOString()
//                     : "",
//                   endDate:
//                     items?.endDate &&
//                     new Date(
//                       items?.endDate
//                     )?.toISOString(),
//                 };
//               }
//             ),
//           },
//           skills:
//             resume?.skills,
//           customSections: (
//             resume?.customSections ??
//             []
//           )
//             .filter(
//               (
//                 section
//               ): section is NonNullable<
//                 typeof section
//               > =>
//                 section !==
//                 null
//             )
//             .map(
//               (
//                 section
//               ) => ({
//                 sectionID:
//                   section.sectionID,
//                 sectionName:
//                   section.sectionName,
//                 lineItems: (
//                   section.lineItems ??
//                   []
//                 )
//                   .filter(
//                     (
//                       item
//                     ): item is NonNullable<
//                       typeof item
//                     > =>
//                       item !==
//                       null
//                   )
//                   .map(
//                     (
//                       item
//                     ) => ({
//                       header:
//                         item.header,
//                       subHeader:
//                         item.subHeader ??
//                         undefined,
//                       description:
//                         item.description ??
//                         undefined,
//                     })
//                   ),
//               })
//             ),
//           template:
//             resume?.template,
//         },
//       }
//     );
//     if (
//       errors
//     ) {
//       console.log(
//         errors
//       );
//       return NextResponse.json(
//         {
//           error: errors,
//         },
//         {
//           status: 500,
//         }
//       );
//     } else
//       return NextResponse.json(
//         {
//           message:
//             "Success",
//           data: data,
//         },
//         {
//           status: 200,
//         }
//       );
//   }
  
//   export async function GET() {
//     const existingProfile = await cookieBasedClient.models.Profile.list();
//     if (
//       existingProfile
//         ?.data
//         ?.length ===
//       0
//     ) {
//       return NextResponse.json(
//         {
//           message:
//             "Profile Not Found",
//           data: [],
//         },
//         {
//           status: 200,
//         }
//       );
//     } else {
//       const resume =
//         existingProfile
//           ?.data?.[0]
//           ?.resume;
//       const id =
//         existingProfile
//           ?.data?.[0]
//           ?.id;
//       const profile: ProfileType = {
//         personalDetails: {
//           ...resume?.personalDetails,
//           country:
//             resume
//               ?.personalDetails
//               ?.country ||
//             undefined,
//           contactNumber:
//             resume
//               ?.personalDetails
//               ?.contactNumber ||
//             undefined,
//           city:
//             resume
//               ?.personalDetails
//               ?.city ||
//             undefined,
//         },
//         roleDetails: {
//           ...resume?.roleDetails,
//           summary:
//             resume
//               ?.roleDetails
//               ?.summary ||
//             undefined,
//           additionalLinks: resume?.roleDetails?.additionalLinks?.map(
//             (
//               item
//             ) => {
//               return {
//                 label:
//                   item?.label ||
//                   undefined,
//                 url:
//                   item?.url ||
//                   undefined,
//               };
//             }
//           ),
//         },
//         education: {
//           fieldName:
//             resume
//               ?.education
//               ?.fieldName ??
//             "Education",
//           lineItem: (
//             resume
//               ?.education
//               ?.lineItem ??
//             []
//           )
//             .filter(
//               (
//                 item
//               ): item is NonNullable<
//                 typeof item
//               > =>
//                 item !==
//                 null
//             )
//             .map(
//               (
//                 item
//               ) => ({
//                 institute:
//                   item.institute,
//                 degree:
//                   item.degree,
//                 location:
//                   item.location,
//                 startDate: new Date(
//                   item.startDate
//                 ),
//                 endDate: item.endDate
//                   ? new Date(
//                       item.endDate
//                     )
//                   : undefined,
//                 description:
//                   item.description ??
//                   undefined,
//               })
//             ),
//         },
//         workExperience: {
//           fieldName:
//             resume
//               ?.workExperience
//               ?.fieldName ??
//             "Work Experience",
//           lineItem: (
//             resume
//               ?.workExperience
//               ?.lineItem ??
//             []
//           )
//             .filter(
//               (
//                 item
//               ): item is NonNullable<
//                 typeof item
//               > =>
//                 item !==
//                 null
//             )
//             .map(
//               (
//                 item
//               ) => ({
//                 company:
//                   item.company,
//                 role:
//                   item.role,
//                 location:
//                   item.location,
//                 startDate: new Date(
//                   item.startDate
//                 ),
//                 endDate: item.endDate
//                   ? new Date(
//                       item.endDate
//                     )
//                   : undefined,
//                 description:
//                   item.description ??
//                   undefined,
//               })
//             ),
//         },
//         skills: {
//           fieldName:
//             resume
//               ?.skills
//               ?.fieldName ||
//             "Skills",
//           data:
//             resume
//               ?.skills
//               ?.data ||
//             undefined,
//         },
//         customSections: (
//           resume?.customSections ??
//           []
//         )
//           .filter(
//             (
//               section
//             ): section is NonNullable<
//               typeof section
//             > =>
//               section !==
//               null
//           )
//           .map(
//             (
//               section
//             ) => ({
//               sectionID:
//                 section.sectionID,
//               sectionName:
//                 section.sectionName,
//               lineItems: (
//                 section.lineItems ??
//                 []
//               )
//                 .filter(
//                   (
//                     item
//                   ): item is NonNullable<
//                     typeof item
//                   > =>
//                     item !==
//                     null
//                 )
//                 .map(
//                   (
//                     item
//                   ) => ({
//                     header:
//                       item.header,
//                     subHeader:
//                       item.subHeader ??
//                       undefined,
//                     description:
//                       item.description ??
//                       undefined,
//                   })
//                 ),
//             })
//           ),
//         template:
//           resume?.template ||
//           "Classic",
//         sectionOrder:
//           resume?.sectionOrder?.map(
//             (
//               item
//             ) => ({
//               id: item!
//                 .id,
//               type: item!
//                 .type,
//               value: item!
//                 .value,
//             })
//           ) ||
//           [],
//       };
//       return NextResponse.json(
//         {
//           message:
//             "Success",
//           data: {
//             resume: profile,
//             id: id,
//           },
//         },
//         {
//           status: 200,
//         }
//       );
//     }
//   }
  