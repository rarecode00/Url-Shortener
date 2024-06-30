import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center text-white font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form
        className="flex w-full gap-2 md:w-2/4 flex-col sm:flex-row"
        onSubmit={handleSubmit}
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your long URL ..."
          className="h-full py-4 px-4"
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button className="h-full py-4" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <img src="/banner.jpg" alt="banner" className="w-full md:px-11 my-11" />
      <Accordion type="multiple" collapsible className="w-full my-11 md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
