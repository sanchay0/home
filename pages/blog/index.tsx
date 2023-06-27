import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/clientApp'
import { useEffect, useState } from 'react'
import styles from '../../styles/blog.module.css'

export default function HomePage() {
    const [data, setData] = useState(null)

    useEffect(() => {
        const blogs = async () => {
            const response  = await getDocs(collection(db, "blogs"))
            setData(response.docs)
        }

        blogs()
    }, [])

    return (
        <div>
            <p className="text-black">
                Welcome to my blog!
            </p>
            {
                data ? (
                    <ul>
                        {
                            data.map(blog => ({id: blog.id, ...blog.data()})).map(entry => (
                                <li key={entry.id}>{entry.id}, {entry.title}</li>
                            ))
                        }
                    </ul>
                ) : <p>Loading..</p>
            }
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus molestie nunc non blandit massa enim nec. Habitant morbi tristique senectus et netus et malesuada. Sit amet risus nullam eget felis eget nunc. Placerat vestibulum lectus mauris ultrices. Sollicitudin aliquam ultrices sagittis orci. Et tortor consequat id porta nibh. Tincidunt dui ut ornare lectus sit amet est placerat. Cras semper auctor neque vitae tempus quam pellentesque nec. Sed odio morbi quis commodo odio aenean sed. Dui id ornare arcu odio ut sem nulla pharetra diam. In egestas erat imperdiet sed. Sed risus ultricies tristique nulla aliquet enim. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Orci a scelerisque purus semper eget. Tristique magna sit amet purus gravida.

Quis commodo odio aenean sed adipiscing diam donec adipiscing. Neque egestas congue quisque egestas. Facilisi morbi tempus iaculis urna. Accumsan lacus vel facilisis volutpat est velit egestas dui. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Convallis convallis tellus id interdum velit laoreet id donec. Turpis egestas sed tempus urna et pharetra pharetra massa. Lobortis mattis aliquam faucibus purus in. Odio facilisis mauris sit amet massa vitae tortor. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Diam in arcu cursus euismod quis viverra nibh cras. Venenatis a condimentum vitae sapien pellentesque. Adipiscing tristique risus nec feugiat in. Enim eu turpis egestas pretium aenean. Eu augue ut lectus arcu bibendum at varius vel. Tempor orci dapibus ultrices in iaculis.

Fermentum posuere urna nec tincidunt praesent semper feugiat. Quis lectus nulla at volutpat diam ut venenatis tellus. Cursus in hac habitasse platea dictumst quisque. Praesent elementum facilisis leo vel fringilla. Vivamus at augue eget arcu dictum varius. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Felis bibendum ut tristique et. Eu consequat ac felis donec et odio. Faucibus turpis in eu mi bibendum neque. Aliquam nulla facilisi cras fermentum odio. Feugiat pretium nibh ipsum consequat nisl vel. Eleifend mi in nulla posuere sollicitudin aliquam ultrices.

Et netus et malesuada fames ac turpis egestas integer eget. Egestas dui id ornare arcu odio ut. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Bibendum est ultricies integer quis auctor. At erat pellentesque adipiscing commodo. In est ante in nibh mauris cursus. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Tellus mauris a diam maecenas. Convallis tellus id interdum velit laoreet. Viverra mauris in aliquam sem fringilla ut morbi. Tortor at auctor urna nunc. Mauris cursus mattis molestie a iaculis at erat. Pellentesque habitant morbi tristique senectus et. Pulvinar elementum integer enim neque. Tristique senectus et netus et. Praesent semper feugiat nibh sed pulvinar. Ut venenatis tellus in metus vulputate eu scelerisque felis. Vitae ultricies leo integer malesuada nunc. Mi quis hendrerit dolor magna eget est lorem ipsum.

Quis varius quam quisque id. Dictum varius duis at consectetur lorem donec massa. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Risus sed vulputate odio ut enim. Volutpat blandit aliquam etiam erat velit scelerisque in. Dapibus ultrices in iaculis nunc sed augue. Nec feugiat nisl pretium fusce id velit ut tortor. Amet dictum sit amet justo donec enim diam. Adipiscing enim eu turpis egestas pretium aenean pharetra. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Proin libero nunc consequat interdum varius sit amet. Placerat vestibulum lectus mauris ultrices eros in cursus. At in tellus integer feugiat scelerisque varius.
            </p>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus molestie nunc non blandit massa enim nec. Habitant morbi tristique senectus et netus et malesuada. Sit amet risus nullam eget felis eget nunc. Placerat vestibulum lectus mauris ultrices. Sollicitudin aliquam ultrices sagittis orci. Et tortor consequat id porta nibh. Tincidunt dui ut ornare lectus sit amet est placerat. Cras semper auctor neque vitae tempus quam pellentesque nec. Sed odio morbi quis commodo odio aenean sed. Dui id ornare arcu odio ut sem nulla pharetra diam. In egestas erat imperdiet sed. Sed risus ultricies tristique nulla aliquet enim. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Orci a scelerisque purus semper eget. Tristique magna sit amet purus gravida.

Quis commodo odio aenean sed adipiscing diam donec adipiscing. Neque egestas congue quisque egestas. Facilisi morbi tempus iaculis urna. Accumsan lacus vel facilisis volutpat est velit egestas dui. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Convallis convallis tellus id interdum velit laoreet id donec. Turpis egestas sed tempus urna et pharetra pharetra massa. Lobortis mattis aliquam faucibus purus in. Odio facilisis mauris sit amet massa vitae tortor. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Diam in arcu cursus euismod quis viverra nibh cras. Venenatis a condimentum vitae sapien pellentesque. Adipiscing tristique risus nec feugiat in. Enim eu turpis egestas pretium aenean. Eu augue ut lectus arcu bibendum at varius vel. Tempor orci dapibus ultrices in iaculis.

Fermentum posuere urna nec tincidunt praesent semper feugiat. Quis lectus nulla at volutpat diam ut venenatis tellus. Cursus in hac habitasse platea dictumst quisque. Praesent elementum facilisis leo vel fringilla. Vivamus at augue eget arcu dictum varius. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Felis bibendum ut tristique et. Eu consequat ac felis donec et odio. Faucibus turpis in eu mi bibendum neque. Aliquam nulla facilisi cras fermentum odio. Feugiat pretium nibh ipsum consequat nisl vel. Eleifend mi in nulla posuere sollicitudin aliquam ultrices.

Et netus et malesuada fames ac turpis egestas integer eget. Egestas dui id ornare arcu odio ut. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Bibendum est ultricies integer quis auctor. At erat pellentesque adipiscing commodo. In est ante in nibh mauris cursus. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Tellus mauris a diam maecenas. Convallis tellus id interdum velit laoreet. Viverra mauris in aliquam sem fringilla ut morbi. Tortor at auctor urna nunc. Mauris cursus mattis molestie a iaculis at erat. Pellentesque habitant morbi tristique senectus et. Pulvinar elementum integer enim neque. Tristique senectus et netus et. Praesent semper feugiat nibh sed pulvinar. Ut venenatis tellus in metus vulputate eu scelerisque felis. Vitae ultricies leo integer malesuada nunc. Mi quis hendrerit dolor magna eget est lorem ipsum.

Quis varius quam quisque id. Dictum varius duis at consectetur lorem donec massa. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Risus sed vulputate odio ut enim. Volutpat blandit aliquam etiam erat velit scelerisque in. Dapibus ultrices in iaculis nunc sed augue. Nec feugiat nisl pretium fusce id velit ut tortor. Amet dictum sit amet justo donec enim diam. Adipiscing enim eu turpis egestas pretium aenean pharetra. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Proin libero nunc consequat interdum varius sit amet. Placerat vestibulum lectus mauris ultrices eros in cursus. At in tellus integer feugiat scelerisque varius.
            </p>
        </div>
    )
}
