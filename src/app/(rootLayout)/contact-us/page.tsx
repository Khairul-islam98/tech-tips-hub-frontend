import {  FaEnvelope, } from "react-icons/fa";
import contactImg from "../../../../public/assets/images/contact.png"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Locate, Phone } from "lucide-react";

const ContactPage = () => {
    const features = [
        {
          icon: <Phone className="text-4xl text-black size-8" />,
          title: "Phone Number",
          description: "(888) 888-8888",
        },
        {
          icon: <FaEnvelope className="text-4xl text-black size-8" />,
          title: "Email Address",
          description: "johnsmith@example.com",
        },
        {
          icon: <Locate className="text-4xl text-black size-8" />,
          title: "Location",
          description: "Dhaka, Bangladesh",
        },
      ];
    return (
        <div>
      <section className="py-2 pt-10 mb-2">
        <div className="mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="">
                <div className="bg-white p-6 flex flex-col rounded-lg shadow-lg text-center">
                  <div className="text-center mx-auto"> {feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description.slice(0, 100)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-col md:flex-row bg-gray-100 p-8 rounded-lg md:w-[600px] mx-auto mb-5">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <Image
            src={contactImg}
            alt="Contact"
            className="md:w-[400px] h-full object-cover rounded-lg w-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 md:ml-6">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Get in <span className="text-gray-600">touch!</span>{" "}
          </h2>
          <form className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-600">
                Name
              </Label>
              <Input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                type="tel"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Comments
              </Label>
              <Textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Comments"
                required
              ></Textarea>
            </div>
            <div>
              <Button
          
              >
                Send Enquiry
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default ContactPage;