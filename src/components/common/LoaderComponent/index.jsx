import {
   Card,
   CardBody,
   CardHeader,
   Skeleton,
   Spinner,
   Td,
   Tr,
} from "@chakra-ui/react";

const LoaderComponent = () => {
   return (
      <div id="loading">
         <Spinner sx={{ color: "var(--primary)" }} />
      </div>
   );
};

/**
 *
 * @param {colSpan} param0 default 8 column
 * @returns
 */
export const TableLoaderComponent = ({ colSpan }) => {
   return (
      <>
         <Tr>
            <Td colSpan={colSpan || 8}>
               <Skeleton height="10" />
            </Td>
         </Tr>
         <Tr>
            <Td colSpan={colSpan || 8}>
               <Skeleton height="10" />
            </Td>
         </Tr>
      </>
   );
};

/**
 *
 * @param {w} param0 default width 220px
 * @returns
 */
export const CardLoaderComponent = (props) => {
   return (
      <Card {...props} w={props.w || "220px"}>
         <CardHeader>
            <Skeleton h="5" />
         </CardHeader>
         <CardBody>
            <Skeleton h="5" />
            <Skeleton h="5" />
            <Skeleton h="5" />
            <Skeleton h="5" />
         </CardBody>
      </Card>
   );
};

export default LoaderComponent;
