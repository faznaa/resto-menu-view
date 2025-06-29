// const people = [
//     { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
//     // More people...
//   ]
import Link from 'next/link'
import MenuSuggestionChat from './MenuSuggestionChat';
import MenuSuggestionPicker from './MenuSuggestionPicker';
type Item = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    isVeg: boolean;
    vegColor: string
}
  export default function ItemsTable({ editClick, items, id }: any) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        {items?.length > 0 ? (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Veg/Egg/Non Veg
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item: Item) => (
                      <tr key={item._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {item.name}
                        </td>
                        <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-md">
                          {item.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <img src={item.image_url} alt="" className="h-10 w-10 rounded-full" />
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className=" w-5 h-5 rounded-full bg-${item?.vegColor!=='orange' ? item?.vegColor : 'yellow'}-500"></div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                            onClick={() => editClick(item._id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {item._id}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-center text-lg text-gray-700 font-semibold">No items found</p>
            <MenuSuggestionChat />
            OR
            <MenuSuggestionPicker />
          </div>
        )}
      </div>
    );
  }
  