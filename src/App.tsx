import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoadingState from "./components/LoadingState";

const Home = lazy(() => import("./pages/Home"));
const FindHelp = lazy(() => import("./pages/FindHelp"));
const PostRequest = lazy(() => import("./pages/PostRequest"));
const Businesses = lazy(() => import("./pages/Businesses"));
const BusinessProfile = lazy(() => import("./pages/BusinessProfile"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const Opportunities = lazy(() => import("./pages/Opportunities"));
const LostFound = lazy(() => import("./pages/LostFound"));
const About = lazy(() => import("./pages/About"));
const HowWeEarn = lazy(() => import("./pages/HowWeEarn"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-canvas">
            <LoadingState label="Loading Ghana Help Hub…" />
          </div>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/find-help" element={<FindHelp />} />
            <Route path="/post-request" element={<PostRequest />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/businesses/:id" element={<BusinessProfile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/lost-found" element={<LostFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-we-earn" element={<HowWeEarn />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
